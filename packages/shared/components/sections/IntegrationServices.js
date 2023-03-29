import React from 'react';
import styled from '@emotion/styled';

import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';

import { ltPurple } from '@sentry-static/shared/utils/css/colors';
import { SectionPadBottom } from '@sentry-static/shared/components/LayoutUtils';
import Button from '@sentry-static/shared/components/Button';

const IntegrationServices = props => (
  <>
    {props.integrations.length > 0 && (
      <>
        <FlexGrid>
          {props.integrations.map(
            ({ label, description, logo: Logo, linkTo, firstParty }) => {
              let isImg = /(^data:)|(.png|.jpg|.gif)$/.test(Logo);
              let displayLogo = isImg ? (
                <StyledLogo src={Logo} alt={label} />
              ) : (
                <Logo />
              );
              return (
                <FlexGridCell md={4} key={label}>
                  <FlexGrid>
                    <FlexGridCell xs={3}>{displayLogo}</FlexGridCell>
                    <FlexGridCell xs={9}>
                      <SectionPadBottom>
                        <IntegrationTitle>
                          <IntegrationLabel>{label}</IntegrationLabel>
                          {!firstParty && (
                            <IntegrationBadge>Third-Party</IntegrationBadge>
                          )}
                        </IntegrationTitle>
                        <p>{description}</p>
                        {linkTo && (
                          <Button
                            inheritColor={true}
                            variant="quiet"
                            to={linkTo}
                          >
                            Learn More
                          </Button>
                        )}
                      </SectionPadBottom>
                    </FlexGridCell>
                  </FlexGrid>
                </FlexGridCell>
              );
            }
          )}
        </FlexGrid>
      </>
    )}
  </>
);

const IntegrationTitle = styled.h3`
  margin-bottom: 0.25rem;
`;

const IntegrationLabel = styled.span`
  display: inline-flex;
`;

const IntegrationBadge = styled.div`
  color: ${ltPurple};
  font-size: 1rem;
  font-weight: normal;
`;

const StyledLogo = styled.img`
  width: 100%;
`;

export default IntegrationServices;
