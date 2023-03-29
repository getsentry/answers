import Cookies from 'js-cookie'

import generateUUID from '@sentry-static/shared/utils/generateUUID';
import sha1 from '@sentry-static/shared/utils/sha1';
import * as Sentry from '@sentry/react';


type Choices = Array<boolean | string>;
type Weights = Array<number>;

type Options = {
  choices: Choices;
  weights?: Weights;
  cookieName?: string;
};

export class ABTest {
  name: string;
  choices: Choices;
  cookieName: string;
  #weights: Weights | undefined;

  constructor(name: string, options: Options) {
    if (options) {
      this.validateOptions(options);
    }
    this.name = name;
    this.choices = options.choices;
    this.#weights = options?.weights;
    this.cookieName = options?.cookieName || 'anonId';
  }

  validateOptions(options: Options) {
    if (options.choices.length < 2) {
      throw new Error('Must have at least two choices');
    }
    if (options.weights && options.weights.length !== options.choices.length) {
      throw new Error('Length of weights must match options');
    }
  }

  get weights(): Array<number> {
    return this.#weights ?? Array(this.choices.length).fill(1);
  }

  // get or generate an anonymous ID
  // this ID is used to determine which variant to give the user
  get anonymousId(): string | null {
    // on the server, window won't exist
    if (typeof window === "undefined") {
      return null;
    }
    let val = Cookies.get(this.cookieName);
    if (!val) {
      val = generateUUID();
      Cookies.set(this.cookieName, val)
    }
    return val;
  }

  // Given a seed, return a random number between 0 and 1
  // The same seed will always return the smame value
  async getResultFromSeed(seed: string): Promise<number> {
    // taken from: https://github.com/Alephbet/alephbet/blob/5a4dca52d4682511337888873a1d3af7c050b9e5/src/utils.js#L58
    const sha1Val = await sha1(seed);
    // takes 52 bits (6.5 bytes) and divide by 0xfffffffffffff (2^52-1)
    const result = parseInt(
      sha1Val.toString().substr(0, 13),
      16
    ) / 0xfffffffffffff
    return result;
  }

  // Return a number between 0 and 1 inclusive 
  // always returns the same value for the same anon user and same experiment
  async determinsticRandomNumber(): Promise<number> {
    const anonymousId = this.anonymousId;
    // if no anon id, retrun 0 so we always get the default variant 
    if (!anonymousId) {
      return 0;
    }
    const seed = `${this.name}.${anonymousId}`;
    return await this.getResultFromSeed(seed);
  }

  get default(){
    return this.choices[0];
  }

  // This function will generate a deterministiic random number between 0 and 1, multiply by the sum of all the weights
  // The output index will correspond to a particular choicee that accounts for the weight of each choice
  async getVariant() {
    // taken from https://github.com/Alephbet/alephbet/blob/5a4dca52d4682511337888873a1d3af7c050b9e5/src/experiment.js#L93-L112
    const weights = this.weights;
    const sumWeights = weights.reduce((a: number, b: number) => a + b, 0);
    let weightedIndex = Math.ceil(await this.determinsticRandomNumber() * sumWeights);
    for (let i = 0; i < this.choices.length; i++) {
      const weight = weights[i];
      weightedIndex -= weight;
      if (weightedIndex <= 0) return this.choices[i];
    }
    // should never happen, but if so return the default variant
    return this.default;
  }

  async logExposure(assignment: string | boolean | null) {
    // if the value of this experiment matches the stored value, we can
    // skip calling log_exposure
    try {
      if (getExperimentLogged(this.name)) {
        return;
      }
    } catch {
      // localStorage is probably not permitted.
      return;
    }

    if (assignment === null) {
      assignment = await this.getVariant();
    }

    const data = {
      experiment_name: this.name,
      assignment
    };
  
    (window as any).dataLayer?.push({
      event: 'gtmClick',
      clickText: 'Marketing Experiment Triggered',
      extraData: data,
    });

    // no user id so we use -1 to make reload happy
    (window as any)?.ra?.event('marketing_experiment.triggered', {...data, user_id: -1, allow_no_schema: true});
    // update local storage with the new experiment we've logged
    setExperimentLogged(this.name);
  }
}

export class BooleanABTest extends ABTest {
  constructor(name: string, options?: Omit<Options, 'choices'>) {
    const choices = [false, true];
    super(name, { ...options, choices });
  }
}

const SENTRY_EXPERIMENTS_KEY = 'logged-sentry-static-site-experiments';
const getExperimentsLogged = () => {
  // If access to localStorage fails, throw.
  const localStorageExperiments = localStorage.getItem(SENTRY_EXPERIMENTS_KEY);

  try {
    const jsonData = JSON.parse(localStorageExperiments || '[]');
    return new Set(jsonData);
  } catch (err) {
    // some sort of malformed json
    Sentry.captureException(err);
    throw err;
  }
};

const getExperimentLogged = (key: string) => {
  const experimentData = getExperimentsLogged();
  return experimentData.has(key);
};

const setExperimentLogged = (key: string) => {
  const loggedExperiments = getExperimentsLogged();
  loggedExperiments.add(key);
  try {
    localStorage.setItem(SENTRY_EXPERIMENTS_KEY, JSON.stringify(Array.from(loggedExperiments)));
  } catch (err) {
    // localStorage isn't permitted.
  }
};
