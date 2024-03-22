const founderController = require('../../src/controllers/founder.controller');
const pool = require('../../src/config/dataBaseConnection');

jest.mock('../../src/config/dataBaseConnection');

describe('Founder Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addFounder', () => {

        it('should add a new founder', async () => {
            const event = { pathParameters: { companyId: 1 }, body: JSON.stringify({ fullName: 'John Doe', title: 'CEO' }) };
            const expectedResult = {
                statusCode: 201,
                body: JSON.stringify({
                    resMessage: "Founder created successfully!!",
                    data: { id: 1, company_id: 1, fullName: 'John Doe', title: 'CEO' }
                })
            };

            pool.connect.mockResolvedValue({
                query: jest.fn()
                    .mockResolvedValueOnce({ rows: [] })
                    .mockResolvedValueOnce({ rows: [{ id: 1, company_id: 1 , ...JSON.parse(event.body) }] }),
                release: jest.fn()
            });

            const result = await founderController.addFounder(event);
            expect(result).toEqual(expectedResult);
        });

        it('should retun founder already associated with company', async () => {
            const event = { pathParameters: { companyId: 1 }, body: JSON.stringify({ fullName: 'John Doe', title: 'CEO' }) };
            const expectedResult = {
                statusCode: 400,
                body: JSON.stringify({
                    resMessage: "Founder is already associated with another company"
                })
            };

            pool.connect.mockResolvedValue({
                query: jest.fn().mockResolvedValue({ rows: [{ id: 1, company_id: 1, ...event.body }] }),
                release: jest.fn()
            });

            const result = await founderController.addFounder(event);
            expect(result).toEqual(expectedResult);
        });

        it('should handle errors during founder creation', async () => {
            const event = { pathParameters: { companyId: 1 }, body: JSON.stringify({ fullName: 'John Doe', title: 'CEO' }) };
            const expectedResult = {
                statusCode: 500,
                body: JSON.stringify({ resMessage: 'Internal Server Error' })
            };

            pool.connect.mockRejectedValue(new Error('Database error'));

            const result = await founderController.addFounder(event);
            expect(result).toEqual(expectedResult);
        });
    });
});
