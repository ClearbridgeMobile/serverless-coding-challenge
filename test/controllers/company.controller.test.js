// __tests__/company.controller.test.js
const companyController = require('../../src/controllers/company.controller');
const pool = require('../../src/config/dataBaseConnection');

jest.mock('../../src/config/dataBaseConnection');

describe('Company Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createCompany', () => {
        it('should create a new company', async () => {
            const event = { body: JSON.stringify({ name: 'Company A', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01' }) };
            const expectedResult = {
                statusCode: 201,
                body: JSON.stringify({
                    resMessage: "Company created successfully!!",
                    data: { id: 1, ...JSON.parse(event.body) }
                })
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [{ id: 1, ...JSON.parse(event.body) }] }),
                release: jest.fn()
            });

            const result = await companyController.createCompany(event);
            expect(result).toEqual(expectedResult);
        });

        it('should handle errors during company creation', async () => {
            const event = { body: JSON.stringify({ name: 'Company A', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01' }) };
            const expectedResult = {
                statusCode: 500,
                body: JSON.stringify({ resMessage: 'Internal Server Error' })
            };

            pool.connect.mockRejectedValue(new Error('Database error'));

            const result = await companyController.createCompany(event);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('updateCompany', () => {
        it('should update company details', async () => {
            const event = {
                pathParameters: {
                    companyId: "1"
                },
                body: JSON.stringify({
                    name: 'Company A Changed', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01'
                })
            };
            const expectedResult = {
                statusCode: 200,
                body: JSON.stringify({
                    resMessage: "Company updated successfully!!",
                    data: { id: 1, ...JSON.parse(event.body) }
                })
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [{ id: 1, ...JSON.parse(event.body) }] }),
                release: jest.fn()
            });

            const result = await companyController.updateCompany(event);
            expect(result).toEqual(expectedResult);
        });

        it('should handle company not found', async () => {
            const event = {
                pathParameters: {
                    companyId: "13"
                },
                body: JSON.stringify({
                    name: 'Company A Changed', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01'
                })
            };
            const expectedResult = {
                statusCode: 404,
                body: JSON.stringify({ resMessage: 'Company not found' }),
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [] }),
                release: jest.fn()
            });

            const result = await companyController.updateCompany(event);
            expect(result).toEqual(expectedResult);
        });


        it('should handle errors during company updation', async () => {
            const event = {
                pathParameters: {
                    companyId: "1"
                },
                body: JSON.stringify({
                    name: 'Company A Changed', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01'
                })
            };
            const expectedResult = {
                statusCode: 500,
                body: JSON.stringify({ resMessage: 'Internal Server Error' })
            };

            pool.connect.mockRejectedValue(new Error('Database error'));

            const result = await companyController.updateCompany(event);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('listCompanies', () => {
        it('should return all companies', async () => {
            const mockCompanies = [
                { id: 1, name: 'Company A', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01' },
                { id: 2, name: 'Company B', city: 'City B', state: 'State B', description: 'Description B', founded_date: '2024-01-01' }
            ];
            const expectedResult = {
                statusCode: 200,
                body: JSON.stringify({
                    data: mockCompanies,
                    totalCount: mockCompanies.length
                }),
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: mockCompanies, rowCount:  mockCompanies.length}),
                release: jest.fn()
            });

            const result = await companyController.listCompanies();
            expect(result).toEqual(expectedResult);
        });

        it('should handle errors', async () => {
            const expectedResult = {
                statusCode: 500,
                body: JSON.stringify({ resMessage: 'Internal Server Error' })
            };

            pool.connect.mockRejectedValue(new Error('Database error'));

            const result = await companyController.listCompanies();
            expect(result).toEqual(expectedResult);
        });
    });

    describe('getCompany', () => {
        it('should return company details', async () => {
            const companyId = '1';
            const event = { pathParameters: { companyId } };
            const expectedCompany = { id: companyId, name: 'Company A', city: 'City A', state: 'State A', description: 'Description A', founded_date: '2023-01-01' };


            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [expectedCompany] }),
                release: jest.fn()
            });
            expectedCompany.founders = [{}]
            const expectedResult = {
                statusCode: 200,
                body: JSON.stringify({ data: expectedCompany }),
            };
            const result = await companyController.getCompany(event);
            expect(result).toEqual(expectedResult);
        });

        it('should handle company not found', async () => {
            const companyId = '11';
            const event = { pathParameters: { companyId } };
            const expectedResult = {
                statusCode: 404,
                body: JSON.stringify({ resMessage: 'Company not found' }),
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [] }),
                release: jest.fn()
            });

            const result = await companyController.getCompany(event);
            expect(result).toEqual(expectedResult);
        });

        it('should handle errors', async () => {
            const companyId = '1';
            const event = { pathParameters: { companyId } };
            const expectedResult = {
                statusCode: 500,
                body: JSON.stringify({ resMessage: 'Internal Server Error' })
            };

            pool.connect.mockRejectedValue(new Error('Database error'));

            const result = await companyController.getCompany(event);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('deleteCompany', () => {
        it('should delete company and associated founders', async () => {
            const companyId = '1';
            const event = { pathParameters: { companyId } };
            const expectedResult = {
                statusCode: 204,
                body: JSON.stringify({
                    resMessage: "Company deleted successfully!!"
                }),
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [{ id: companyId }] }),
                release: jest.fn()
            });

            const result = await companyController.deleteCompany(event);
            expect(result).toEqual(expectedResult);
        });

        // it('should handle company not found', async () => {
        //     const companyId = '11';
        //     const event = { pathParameters: { companyId } };
        //     const expectedResult = {
        //         statusCode: 404,
        //         body: JSON.stringify({ resMessage: 'Company not found' }),
        //     };

        //     pool.connect.mockResolvedValue({
        //         query: jest.fn().mockResolvedValue({ rows: [] }),
        //         release: jest.fn()
        //     });

        //     const result = await companyController.deleteCompany(event);
        //     expect(result).toEqual(expectedResult);
        // });

        it('should handle errors', async () => {
            const companyId = '1';
            const event = { pathParameters: { companyId } };
            const expectedResult = {
                statusCode: 500,
                body: JSON.stringify({ resMessage: 'Internal Server Error' })
            };

            pool.connect.mockRejectedValue(new Error('Database error'));

            const result = await companyController.deleteCompany(event);
            expect(result).toEqual(expectedResult);
        });
    });
});
