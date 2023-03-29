import React from 'react';
import { graphql } from 'gatsby';
import SEO from 'components/SEO';
import styled from '@emotion/styled';
import { mqMin } from '@sentry-static/shared/utils/css';
import {
  link,
  colorText,
  bgLight,
} from '@sentry-static/shared/utils/css/colors';
import Layout from 'components/Layout';
import Layer from '@sentry-static/shared/components/layer-next';
import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { PlatformIcon } from 'platformicons';
import LogoPostgres from '@sentry-static/shared/logos/postgres.svg';
import Button from '@sentry-static/shared/components/Button';
import LayerFooterCallToAction from 'components/LayerFooterCallToAction';
import Accordion from '@sentry-static/shared/components/Accordion';
import sentryBugIllustrationImg from 'assets/img/answers/sentry-bug-catch.png';

const platforms = {
  'sentry.flask': {
    name: 'Flask',
    platformicon: 'python-flask',
    sort: 80,
  },
  'sentry.flutter': {
    name: 'Flutter',
    platformicon: 'flutter',
    sort: 60,
  },
  'sentry.go': {
    name: 'Go',
    platformicon: 'go',
    sort: 50,
  },
  'sentry.javascript.browser': {
    name: 'JavaScript',
    platformicon: 'javascript',
    sort: 10,
  },
  'sentry.nodejs': {
    name: 'Node.js',
    platformicon: 'node',
    sort: 20,
  },
  'sentry.postgres': {
    name: 'Postgres',
    logo: LogoPostgres,
    sort: 70,
  },
  'sentry.python': {
    name: 'Python',
    platformicon: 'python',
    sort: 30,
  },
  'sentry.react': {
    name: 'React',
    platformicon: 'javascript-react',
    sort: 40,
  },
  'sentry.django': {
    name: 'Django',
    platformicon: 'python-django',
    sort: 90,
  },
  'sentry.java': {
    name: 'Java',
    platformicon: 'java',
    sort: 120,
  },
  'sentry.swift': {
    name: 'Swift',
    platformicon: 'swift',
    sort: 110,
  },
  'sentry.bash': {
    name: 'Bash',
    platformicon: 'default',
    sort: 100,
  },
  'sentry.html': {
    name: 'HTML',
    platformicon: 'default',
    sort: 130,
  },
  'sentry.cpp': {
    name: 'C++',
    platformicon: 'cpp',
    sort: 140,
  },
  'sentry.csharp': {
    name: 'C#',
    platformicon: 'csharp',
    sort: 150,
  },
  'sentry.macos': {
    name: 'MacOS',
    platformicon: 'apple',
    sort: 160,
  },
};

const AnswersPage = ({ data }) => {
  const answers = data.allAnswers.edges.map(({ node }) => ({
    ...node.fields,
    ...node.frontmatter,
  }));

  const answersByFirstPlatform = answers
    .reduce((a, answer) => {
      const firstPlatformSlug = answer.platforms[0];

      const i = a.findIndex(({ slug }) => slug === firstPlatformSlug);

      let data = platforms[firstPlatformSlug];

      if (!data) {
        throw new Error(
          `Platform data for "${firstPlatformSlug}" not found. Ensure the slug in the answer matches the slug platform list.`
        );
      }

      const platform = a[i] || {
        slug: firstPlatformSlug,
        ...data,
        answers: [],
      };

      platform.answers.push(answer);
      if (i === -1) {
        a.push(platform);
      } else {
        a.splice(i, 1, platform);
      }

      return a;
    }, [])
    .sort((a, b) => {
      return a.sort - b.sort;
    });

  return (
    <Layout>
      <SEO
        title={`Answers by Sentry`}
        description={`Answers and explanations to help developers understand concepts and avoid future problems. Learn why problems happen, not just how to resolve one instance of them.`}
      />

      <Layer backgroundColor={bgLight}>
        <StyledFlexGrid>
          <StyledFlexGridCellSideHero md={5}>
            <StyledImgSidebar src={sentryBugIllustrationImg} />
            <h1>Answers by Sentry</h1>
            <p>
              Answers and explanations to help developers understand concepts
              and avoid future problems. Learn why problems happen, not just how
              to resolve one instance of them.
            </p>
            <MarginButton to="mailto:answers@sentry.io?subject=I have a question&body=Ask about a technical problem you're experiencing and we'll answer it with a deep-dive into why it's happening, and explain how to avoid it in the future.">
              Ask a question
            </MarginButton>
            <MarginButton to="https://discord.gg/sentry">
              Join the discussion
            </MarginButton>
          </StyledFlexGridCellSideHero>
          <FlexGridCell md={7}>
            <StyledUlPlatformList>
              {answersByFirstPlatform.map(platform => {
                const { logo: Logo } = platform;

                {
                  platform.platformicon && (
                    <PlatformIcon
                      platform={platform.platformicon}
                      format="lg"
                      size="64"
                    />
                  );
                }
                {
                  Logo && <Logo />;
                }
                <h3>{platform.name}</h3>;

                return (
                  <li key={platform.slug}>
                    <Accordion
                      key={platform.slug}
                      title={
                        <h3>
                          {platform.platformicon && (
                            <PlatformIcon
                              platform={platform.platformicon}
                              format="lg"
                              size="64"
                            />
                          )}
                          {Logo && <Logo />} {platform.name}
                        </h3>
                      }
                    >
                      <div>
                        <StyledUlQuestionList>
                          {platform.answers.map(answer => (
                            <a href={answer.slug}>
                              <li key={answer.slug}>{answer.title}</li>
                            </a>
                          ))}
                        </StyledUlQuestionList>
                      </div>
                    </Accordion>
                  </li>
                );
              })}
            </StyledUlPlatformList>
          </FlexGridCell>
        </StyledFlexGrid>
      </Layer>
      <LayerFooterCallToAction />
    </Layout>
  );
};

const StyledFlexGridCellSideHero = styled(FlexGridCell)`
  text-align: center;

  ${mqMin('md')} {
    text-align: left;
  }
`;

const StyledImgSidebar = styled.img`
  max-width: 250px;
  padding: 1rem;
  margin: 0 auto;
  display: block;
`;

const MarginButton = styled(Button)`
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  ${mqMin('xl')} {
    width: auto;
  }
`;

const StyledFlexGrid = styled(FlexGrid)`
  align-items: stretch;
  margin-bottom: 1rem;
`;

const StyledUlPlatformList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0 1rem;

  ${mqMin('lg')} {
    margin: 0 -1rem;
  }

  > li {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;

    svg,
    img {
      width: 3rem;
      height: 100%;
      margin-right: 2rem;
      flex-shrink: 0;
    }

    > div {
      width: 100%;
      margin-bottom: 0;

      button {
        padding: 0.75rem 1rem;
      }

      > div {
        padding-left: 2.5rem;
      }

      h3 {
        margin: 0;
      }
    }
  }
`;

const StyledUlQuestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;

  a {
    color: ${colorText};
    font-weight: bold;
    transition: color 0.25s;

    &:hover {
      color: ${link};
      text-decoration: none;
    }
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;

    &::before {
      content: '';
      border: solid ${link};
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3.5px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      position: absolute;
      left: -1.15rem;
      top: 0.7rem;
    }
  }
`;

export default AnswersPage;

export const query = graphql`
  query {
    form: marketoForm(marketoId: { eq: 1079 }) {
      ...MarketoForm
    }
    allAnswers: allMdx(
      filter: { fields: { slug: { glob: "/answers/*" } } }
      sort: { fields: frontmatter___platforms, order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            platforms
          }
        }
      }
    }
  }
`;
