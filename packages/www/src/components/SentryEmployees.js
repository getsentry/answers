import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Layer from '@sentry-static/shared/components/layer-next';
import Prose from '@sentry-static/shared/components/Prose';
import Button from '@sentry-static/shared/components/Button';
import {
  FlexGrid,
  FlexGridCell,
} from '@sentry-static/shared/components/FlexGrid';
import { TextAlign } from '@sentry-static/shared/components/Typography';
import { mqMin } from '@sentry-static/shared/utils/css';
import { white, bgLight } from '@sentry-static/shared/utils/css/colors';
import EmployeeBio from 'components/EmployeeBio';
import randomizer from '@sentry-static/shared/utils/randomizer';
import ErrorBoundary from '@sentry-static/shared/components/error-boundary';

import useEmployees from '../hooks/useEmployees';

export default function SentryEmployees() {
  const initialAmount = 12;
  const [employees, setEmployees] = useState([]);
  const [visible, setVisible] = useState(initialAmount);

  const employeeData = useEmployees();

  // Not entirely needed at this point, but in place
  // for/when employee data becomes externalized.
  useEffect(() => {
    const randomizedData = randomizer(employeeData);
    setEmployees(randomizedData);
  }, []);

  return (
    <Layer
      backgroundColor={bgLight}
      clipTop="slopeRight"
      paddingBottom
      id="sentry-employee-layer"
    >
      <ErrorBoundary>
        <FlexGrid justifyContent="center">
          <StyledProseCell lg={12}>
            <TextAlign xs="center">
              <Prose disableHeadingSpace={true}>
                <h2>The People Who Make Sentry</h2>
              </Prose>
            </TextAlign>
          </StyledProseCell>
          {employees
            .filter(employee => {
              return employee.name && employee.picture && employee.blurb;
            })
            .slice(0, visible)
            .map((employee, i) => (
              <FlexGridCell key={employee.name} xs={6} md={4} lg={3}>
                <EmployeeBio {...employee} />
              </FlexGridCell>
            ))}
          {visible === initialAmount && (
            <FlexGridButtonCell xs={12}>
              <TextAlign xs="center">
                <Button
                  variant="quiet"
                  onClick={() => setVisible(employees.length)}
                >
                  Meet the rest of the team
                </Button>
              </TextAlign>
            </FlexGridButtonCell>
          )}
        </FlexGrid>
      </ErrorBoundary>
    </Layer>
  );
}

const FlexGridButtonCell = styled(FlexGridCell)`
  padding-top: 2rem;
`;

const StyledProseCell = styled(FlexGridCell)`
  margin-bottom: 2rem;

  ${mqMin('lg')} {
    margin-bottom: 3rem;
  }
`;
