import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'isomorphic-dompurify';

import styled from '@emotion/styled';
import {
  dkViolet,
  white,
  mdPink,
  gray1,
  gray2,
} from '@sentry-static/shared/utils/css/colors';

import { SentryGlobalSearch } from '@sentry-internal/global-search';
import LoadingIndicator from './LoadingIndicator';

const DEFAULT_CONFIG = ['docs', 'help-center', 'develop', 'blog'];

const useClickOutside = (
  ref,
  handler = () => null,
  events = ['mousedown', 'touchstart']
) => {
  const detectClickOutside = event => {
    return !ref.current?.contains(event.target) && handler();
  };

  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, detectClickOutside);
    }

    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectClickOutside);
      }
    };
  });
};

const Search = ({ config, platforms, path, placeholder }) => {
  const ref = useRef(null);
  const [search, setSearch] = useState();
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);
  const [focus, setFocus] = useState(false);
  const [showOffsiteResults, setShowOffsiteResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useClickOutside(ref, () => {
    setFocus(false);
    setShowOffsiteResults(false);
  });

  const totalHits = results.reduce((a, x) => a + x.hits.length, 0);

  useEffect(() => {
    setSearch(new SentryGlobalSearch(config || DEFAULT_CONFIG));
  }, [config]);

  const searchFor = (query, args) => {
    setQuery(query);

    if (query.length >= 2) {
      // Only search when we have more than two characters. Ideally we'd do three, but we want to make sure people can search for Go and RQ
      search
        .query(query, {
          platforms,
          path,
          searchAllIndexes: showOffsiteResults,
          ...args,
        })
        .then(results => {
          if (isLoading) setIsLoading(false);

          if (results.length === 1 && results[0].hits.length === 0) {
            setShowOffsiteResults(true);
            searchFor(query, { searchAllIndexes: true });
          } else {
            setResults(results);
          }
        });
    } else if (query.length === 0) {
      // If the user cleared the query, reset everything.
      setShowOffsiteResults(false);
      setResults([]);
    }
  };

  return (
    <StyledSearch ref={ref}>
      <input
        type="search"
        placeholder={placeholder || 'Search'}
        aria-label="Search"
        className="form-control"
        onChange={({ target: { value: query } }) => {
          searchFor(query);
        }}
        value={query}
        onFocus={() => setFocus(true)}
      />

      {query.length >= 2 && focus && (
        <div className="sgs-search-results">
          {isLoading && (
            <LoadingIndicator
              loading={true}
              className="sgs-loading-indicator"
            />
          )}

          {!isLoading && totalHits > 0 && (
            <>
              <div className="sgs-search-results-scroll-container">
                {results
                  .filter(x => x.hits.length > 0)
                  .map((result, i) => {
                    const { hits } = result;

                    return (
                      <React.Fragment key={result.site}>
                        {showOffsiteResults && (
                          <h4 className="sgs-site-result-heading">
                            From {result.name}
                          </h4>
                        )}
                        <ul
                          className={`sgs-hit-list ${
                            i === 0 ? '' : 'sgs-offsite'
                          }`}
                        >
                          {hits.map(hit => (
                            <li key={hit.id} className="sgs-hit-item">
                              <a href={hit.url}>
                                {hit.title && (
                                  <h6>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(hit.title, {
                                          ALLOWED_TAGS: ['mark'],
                                        }),
                                      }}
                                    ></span>
                                  </h6>
                                )}
                                {hit.text && (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(hit.text, {
                                        ALLOWED_TAGS: ['mark'],
                                      }),
                                    }}
                                  />
                                )}
                                {hit.context && (
                                  <div className="sgs-hit-context">
                                    {hit.context.context1 && (
                                      <div className="sgs-hit-context-left">
                                        {hit.context.context1}
                                      </div>
                                    )}
                                    {hit.context.context2 && (
                                      <div className="sgs-hit-context-right">
                                        {hit.context.context2}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </React.Fragment>
                    );
                  })}
              </div>
            </>
          )}

          {!isLoading && totalHits === 0 && (
            <div className="sgs-hit-empty-state">
              No results for <em>{query}</em>
            </div>
          )}

          {!isLoading && !showOffsiteResults && (
            <button
              className="sgs-expand-results-button"
              onClick={() => setShowOffsiteResults(true)}
              onMouseOver={() => searchFor(query, { searchAllIndexes: true })}
            >
              Load more <em>{query}</em> results across all Sentry sites
            </button>
          )}
        </div>
      )}
    </StyledSearch>
  );
};

export default Search;

const StyledSearch = styled.div`
  text-align: left;
  position: relative;

  --sgs-color-border: ${dkViolet};

  --sgs-color-white: ${white};

  --sgs-color-progress-indicator: ${dkViolet};

  --sgs-color-result-heading-backgorund: ${dkViolet};
  --sgs-color-result-heading-text: ${white};

  --sgs-color-hit-text: ${dkViolet};
  --sgs-color-hit-highlight: ${mdPink};
  --sgs-color-hit-context: ${dkViolet};
  --sgs-color-hit-hover-background: ${gray1};

  --sgs-color-expand-results-background: ${gray2};
  --sgs-color-expand-results-text: ${dkViolet};

  .sgs-search-results {
    position: absolute;
    margin-top: 0.5rem;
    z-index: 5;
    border: 0.25rem solid var(--sgs-color-border);
    border-radius: 0.5rem;
    background-color: var(--sgs-color-white);
    font-size: 0.875rem;
    max-height: 40rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;

    .logo {
      margin-top: 0.75rem;
      margin-bottom: 0.5rem;
      color: var(--sgs-color-progress-indicator);
      width: 3rem;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .sgs-search-results-scroll-container {
    flex: 1;
    overflow: auto;
  }

  .sgs-site-result-heading {
    background-color: var(--sgs-color-result-heading-backgorund);
    color: var(--sgs-color-result-heading-text);
    padding: 0.5rem 1rem;
    font-weight: normal;
    margin-bottom: 0;
  }

  .sgs-hit-list {
    list-style: none;
    margin: 0;
    padding: 0.25rem;

    &.sgs-offsite {
      background-color: var(--sgs-color-hit-hover-background);

      .sgs-hit-item > a:hover {
        background-color: var(--sgs-color-white);
      }
    }
  }

  .sgs-hit-item {
    mark {
      color: var(--sgs-color-hit-highlight);
      background: inherit;
      padding: 0;
    }

    h6 {
      margin-top: 0;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
      color: var(--sgs-color-hit-text);
    }

    a {
      display: block;
      text-decoration: none;
      color: var(--sgs-color-hit-text);

      padding: 0.75rem;
      line-height: 1.5;

      &:hover {
        background-color: var(--sgs-color-hit-hover-background);
      }
    }
  }

  .sgs-hit-empty-state {
    display: block;
    text-decoration: none;
    color: var(--sgs-color-hit-text);
    padding: 0.75rem;
    line-height: 1.5;
  }

  .sgs-hit-context {
    margin-top: 0.25rem;
    display: flex;
    font-size: 0.75rem;
    color: var(--sgs-color-hit-context);

    .sgs-hit-context-left {
      font-style: italic;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 0.25rem;
      flex: 1;
    }

    .sgs-hit-context-right {
      flex: 0;
    }
  }

  .sgs-expand-results-button {
    display: block;
    border: 0;
    background-color: var(--sgs-color-expand-results-background);
    border-radius: 3px;
    padding: 0.25rem 0.75rem;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    font-weight: bold;
    color: var(--sgs-color-expand-results-text);
    line-height: 28px;
    cursor: pointer;
  }

  .sgs-loading-indicator {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;
