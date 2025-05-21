import { DepartmentType } from '@/types/dealerManagementSliceType';
import { apiSlice } from '../api/apiSlice';

export const dealerManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentType[], void>({
      query: () => ({
        url: '/departments/',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getDepartmentById: builder.query<DepartmentType, string>({
      query: (id) => ({
        url: `/departments/${id}/`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    addDepartment: builder.mutation<any, DepartmentType>({
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
