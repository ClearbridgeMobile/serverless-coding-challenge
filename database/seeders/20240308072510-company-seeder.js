'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const entries = [
      {
        name: 'Company 1',
        description: 'Company 1',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-1',
        founder: {
          name: 'John Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 2',
        description: 'Company 2',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-2',
        founder: {
          name: 'James Kimberly',
          title: 'CEO',
        },
      },
      {
        name: 'Company 3',
        description: 'Company 3',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-3',
        founder: {
          name: 'Jasimes Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 4',
        description: 'Company 4',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-4',
        founder: {
          name: 'Kate Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 5',
        description: 'Company 5',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-5',
        founder: {
          name: 'Tommy Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 6',
        description: 'Company 6',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-6',
        founder: {
          name: 'Pack Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 7',
        description: 'Company 7',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-7',
        founder: {
          name: 'Razor Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 8',
        description: 'Company 8',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-8',
        founder: {
          name: 'Luke Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 9',
        description: 'Company 9',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-9',
        founder: {
          name: 'Rose Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 10',
        description: 'Company 10',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-10',
        founder: {
          name: 'Mary Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 11',
        description: 'Company 11',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-11',
        founder: {
          name: 'Love Doe',
          title: 'CEO',
        },
      },
      {
        name: 'Company 12',
        description: 'Company 12',
        state: 'San Francisco',
        city: 'California',
        founded_date: '2023-09-24',
        slug: 'company-12',
        founder: {
          name: 'Paulo Doe',
          title: 'CEO',
        },
      },
    ];

    //const roles = await queryInterface.sequelize.query('SELECT * FROM roles');
    for (const entry of entries) {
      let company = await queryInterface.bulkInsert(
        'companies',
        [
          {
            name: entry.name,
            description: entry.description,
            state: entry.state,
            city: entry.city,
            slug: entry.slug,
          },
        ],
        { returning: ['id'] },
      );

      await queryInterface.bulkInsert('founders', [
        {
          name: entry.founder.name,
          title: entry.founder.title,
          company_id: company[0].id,
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('founders', null, {});
    await queryInterface.bulkDelete('companies', null, {});
  },
};
