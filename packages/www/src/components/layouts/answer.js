import React from 'react';
import { graphql } from 'gatsby';
import SEO from 'components/SEO';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import Layer from '@sentry-static/shared/components/layer-next';
import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { HaloPortrait } from '@sentry-static/shared/components/Portrait';
import Button from '@sentry-static/shared/components/Button';
import chevronLeft from '@sentry-static/shared/icons/icon-chevron-left.svg';
import CustomMDXRenderer from '@sentry-static/shared/components/CustomMDXRenderer';
import { mqMin, screenReadersOnly } from '@sentry-static/shared/utils/css';
import twitterLogo from '@sentry-static/shared/icons/twitter-logo.svg';
import bookmarkIcon from '@sentry-static/shared/icons/bookmark.svg';
import {
  white,
  bgLight,
  link,
  colorText,
  mdYellow,
  mdPink,
  mdViolet,
  mdPurple,
  mdOrange,
} from '@sentry-static/shared/utils/css/colors';
import Line from '@sentry-static/shared/components/Line';
import LayerFooterCallToAction from 'components/LayerFooterCallToAction';
import { floatingObject } from '@sentry-static/shared/utils/css/shadows';
import ghost from '@sentry-static/www/src/content/employees/ghost.png';
import PostDate from '@sentry-static/shared/components/PostDate';

const AnswerTemplate = ({ data }) => {
  const {
    mdx: { frontmatter, body, excerpt, slug },
    site: {
      siteMetadata: { siteUrl, twitterHandle },
    },
  } = data;

  const twitterURL = `https://twitter.com/intent/tweet?text=TIL: ${encodeURIComponent(
    frontmatter.title
  )}%20${siteUrl}/answers/${slug}&amp;rl=${siteUrl}/answers/${slug}&amp;via=${twitterHandle}&amp;related=${twitterHandle}`;

  /* This litle snippet from https://www.thewebflash.com/how-to-add-a-cross-browser-add-to-favorites-bookmark-button-to-your-website/ or something similar is seen here https://stackoverflow.com/questions/54759623/how-to-create-a-bookmark-this-page-button/54763014#54763014 */
  /* This is the best we can do these days as broswers can't add bookmarks on user's behalf (to prevent it from happening w/o them knowing) */
  function CreateBookmarkLink() {
    var title = document.title;
    var url = window.location.href;

    if (window.sidebar && window.sidebar.addPanel) {
      /* Mozilla Firefox Bookmark - works with opening in a side panel only */
      window.sidebar.addPanel(title, url, '');
    } else if (window.opera && window.print) {
      /* Opera Hotlist */
      alert('Press Control + D to bookmark');
      return true;
    } else if (window.external) {
      /* IE Favorite */
      try {
        window.external.AddFavorite(url, title);
      } catch (e) {
        alert('Press Control + D to bookmark');
      }
    } else {
      /* Other */
      alert('Press Control + D to bookmark');
    }
  }

  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />

      <StyledLayer backgroundColor={bgLight}>
        <StyledFlexGrid>
          <FlexGridCell lg={9}>
            <StyledDivBreadcrumb>
              <Button
                variant="silent"
                to="/answers/"
                icon={chevronLeft}
                compensate="left"
              >
                Answers by Sentry
              </Button>
            </StyledDivBreadcrumb>
            <StyledDivContentContainer>
              <StyledH1>{frontmatter.title}</StyledH1>
              <StyledDivExperts>
                {frontmatter.people.map((x, i) => {
                  const haloColor = [
                    mdViolet,
                    mdOrange,
                    mdPink,
                    mdPurple,
                    mdYellow,
                  ][i % 5];

                  let Image = () => (
                    <StyledHaloPortrait
                      src={ghost}
                      haloColor={haloColor}
                      alt={x.name}
                    />
                  );

                  if (x.picture) {
                    Image = () => (
                      <StyledHaloPortrait
                        src={x.picture.publicURL}
                        haloColor={haloColor}
                        alt={x.name}
                      />
                    );
                  } else if (x.portrait) {
                    Image = () => (
                      <StyledHaloPortrait
                        src={x.portrait.publicURL}
                        haloColor={haloColor}
                        alt={x.name}
                      />
                    );
                  }
                  return (
                    <StyledDivAuthor key={x.name}>
                      <Image />
                      <h4>{x.name}</h4>
                    </StyledDivAuthor>
                  );
                })}
              </StyledDivExperts>
              <StyledPostDate date={frontmatter.date} />
              <CustomMDXRenderer body={body} />
            </StyledDivContentContainer>
            <StyledDivButtonWrapper>
              <MarginButton
                variant="default"
                to="https://discord.com/invite/sentry"
              >
                Join the discussion
              </MarginButton>
              <MarginButton variant="default" to="https://sentry.io/careers/#openings">
                Come work with us
              </MarginButton>
            </StyledDivButtonWrapper>
          </FlexGridCell>
          <FlexGridCell lg={3}>
            <StickyDiv>
              <StyledButtonsDiv>
                <StyledHitPlate href={twitterURL} target="_blank">
                  <StyledLogoWrap>
                    <StyledLogo as={twitterLogo} color="#1DA1F2" />
                    <StyledSocialLabel>Share on Twitter</StyledSocialLabel>
                  </StyledLogoWrap>
                </StyledHitPlate>
                <StyledHitPlate onClick={CreateBookmarkLink}>
                  <StyledLogoWrap>
                    <StyledLogo as={bookmarkIcon} color="#8D5494" />
                    <StyledSocialLabel>Bookmark this page</StyledSocialLabel>
                  </StyledLogoWrap>
                </StyledHitPlate>
              </StyledButtonsDiv>
              <MarginButton to="mailto:answers@sentry.io?subject=I have a question&body=Ask about a technical problem you're experiencing and we'll answer it with a deep-dive into why it's happening, and explain how to avoid it in the future.">
                Ask a question
              </MarginButton>
              <MarginButton to="mailto:answers@sentry.io?subject=Technically...&body=Please paste the URL of the post you want to improve along with your suggestions">
                Improve this Answer
              </MarginButton>

              <StyledLine variant="squiggle" color={mdYellow} />
              <h3>Related Answers</h3>
              <StyledUlQuestionList>
                {data.allAnswers.edges
                  .filter(
                    edge =>
                      edge.node.frontmatter.platforms[0] ===
                      frontmatter.platforms[0]
                  )
                  .filter(
                    edge => edge.node.frontmatter.title != frontmatter.title
                  )
                  .map(answer => (
                    <a
                      key={answer.node.fields.slug}
                      href={answer.node.fields.slug}
                    >
                      <li>{answer.node.frontmatter.title}</li>
                    </a>
                  ))}
              </StyledUlQuestionList>
            </StickyDiv>
          </FlexGridCell>
        </StyledFlexGrid>
      </StyledLayer>
      <LayerFooterCallToAction />
    </Layout>
  );
};

const StyledFlexGrid = styled(FlexGrid)`
  align-items: stretch;
`;

const StickyDiv = styled.div`
  position: sticky;
  top: 6rem;
  margin: 1rem auto 2rem;

  ${mqMin('lg')} {
    margin-top: 3.5rem;
  }
`;

const StyledLayer = styled(Layer)`
  > div {
    padding-top: 1rem;
  }
`;

const StyledDivContentContainer = styled.div`
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;

const StyledHitPlate = styled.a`
  display: inline-block;
  position: relative;
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem 0.5rem;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    bottom: -0.5rem;
    left: -0.5rem;
    border-radius: 0.5rem;
    transition: box-shadow 0.3s;
    will-change: box-shadow;
  }

  &:hover {
    cursor: pointer;
    text-decoration: none;

    &:before {
      box-shadow: ${floatingObject};
      background-color: ${white};
    }
  }

  &:active,
  &:focus {
    &:before {
      box-shadow: -0.09375rem -0.09375rem 0 0.09375rem ${mdYellow},
        0 0 0 0.1875rem ${mdPink};
      background-color: ${white};
    }
  }
`;

const StyledLogoWrap = styled.div`
  position: absolute;
  padding: 0.25rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.svg`
  position: relative;
  flex-shrink: 0;
  transition: margin-right 0.2s, margin-left 0.2s;
  height: 100%;
  width: 100%;
  height: auto;
  margin-left: 0;
  color: ${({ color }) => color};
`;

const StyledSocialLabel = styled.span`
  ${screenReadersOnly}
`;

const StyledLine = styled(Line)`
  margin: 1rem 0;
`;

const StyledDivBreadcrumb = styled.div`
  margin-bottom: 1rem;
`;

const StyledH1 = styled.h1`
  margin-bottom: 2rem;
`;

const StyledPostDate = styled(PostDate)`
  display: inline-block;
  height: .5rem;
  line-height: normal;
  margin-bottom: 2rem;
  margin-top: 0;
`;

const StyledDivButtonWrapper = styled.div`
  text-align: center;
`;

const MarginButton = styled(Button)`
  margin: 0 1rem 1rem 0;
  width: 100%;

  ${mqMin('lg')} {
    width: auto;
  }
`;

const StyledButtonsDiv = styled.div`
  text-align: center;
  ${mqMin('lg')} {
    text-align: left;
  }
`;

const StyledDivExperts = styled.div`
  margin: .5rem 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledDivAuthor = styled.div`
  display: flex;
  flex: 0;
  align-items: center;
  margin-bottom: 0;

  h4 {
    margin: 0 0.5rem;
  }
`;

const StyledHaloPortrait = styled(HaloPortrait)`
  width: 8rem;
  flex: 0 1 3rem;
`;

const StyledUlQuestionList = styled.ul`
  list-style: none;
  padding: 0 0 0 1rem;
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
      left: -1.125rem;
      top: 0.7rem;
    }
  }
`;

export default AnswerTemplate;

export const pageQuery = graphql`
  query AnswersQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt(pruneLength: 160)
      slug
      frontmatter {
        title
        platforms
        date
        people {
          id
          name
          portrait {
            publicURL
          }
          haloColor
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
        twitterHandle
      }
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
