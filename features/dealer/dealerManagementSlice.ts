import { DepartmentDataType } from '@/types/dealerManagementSliceType';
import { apiSlice } from '../api/apiSlice';

export const dealerManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentDataType[], void>({
      query: () => ({
        url: '/departments/',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getDepartmentById: builder.query<DepartmentDataType, string>({
      query: (id) => ({
        url: `/departments/${id}/`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    addDepartment: builder.mutation<any, DepartmentDataType>({
      query: (department) => ({
        url: '/departments/',
        method: 'POST',
        body: department,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useAddDepartmentMutation,
} = dealerManagementSlice;
