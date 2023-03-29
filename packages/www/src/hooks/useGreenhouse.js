import { useStaticQuery, graphql } from 'gatsby';

const useEmployees = () => {
  const {
    allGreenhouseDepartment,
    allGreenhouseJob,
    allGreenhouseOffice,
  } = useStaticQuery(graphql`
    fragment GreenhouseJob on GreenhouseJob {
      gh_Id
      title
      absolute_url
      fields {
        slug
        content
      }
      location {
        name
      }
      offices {
        gh_Id
        name
      }
      departments {
        gh_Id
        name
      }
      content
    }

    query GreenhouseQuery {
      allGreenhouseJob {
        edges {
          node {
            ...GreenhouseJob
          }
        }
      }
      allGreenhouseDepartment {
        edges {
          node {
            name
            gh_Id
            jobs {
              ...GreenhouseJob
            }
          }
        }
      }
      allGreenhouseOffice {
        edges {
          node {
            gh_Id
            name
            jobs {
              ...GreenhouseJob
            }
          }
        }
      }
    }
  `);

  const jobs = allGreenhouseJob.edges.map(({ node }) => {
    const meta = {
      type: 'normal',
    };
    if (/intern(\b|ship)/i.test(node.title)) {
      meta.type = 'intern';
    } else if (/new ?grad/i.test(node.title)) {
      meta.type = 'newgrad';
    }
    return { ...node, addedMeta: meta };
  });

  const departments = allGreenhouseDepartment.edges.map(({ node }) => {
    return node;
  });

  const offices = allGreenhouseOffice.edges.map(({ node }) => node);

  const data = {
    jobs,
    internships: jobs.filter(({ addedMeta }) => addedMeta.type === 'intern'),
    newGrads: jobs.filter(({ addedMeta }) => addedMeta.type === 'newgrad'),
    departments: departments.filter(department => {
      const departmentHasOpenJobs = department.jobs && !!department.jobs.length;
      return departmentHasOpenJobs;
    }),
    offices: offices.filter(office => {
      const mainOffices = [
        24323, // San Francisco
        61301, // Toronto
        24861, // Vienna
        81692, // Seattle
      ];
      // Always show the main offices, even when there are no roles.
      const isMainOffice = mainOffices.indexOf(office.gh_Id) !== -1;
      const officeHasOpenJobs = !!office.jobs.length;
      return isMainOffice || officeHasOpenJobs;
    }),
  };

  return data;
};

export default useEmployees;
