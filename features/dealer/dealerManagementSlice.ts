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
      providesTags: ['Departments'],
    }),
    getDepartmentById: builder.query<DepartmentDataType, string>({
      query: (id) => ({
        url: `/departments/${id}/`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Departments'],
    }),
    addDepartment: builder.mutation<any, DepartmentDataType>({
      query: (department) => ({
        url: '/departments/',
        method: 'POST',
        body: department,
        credentials: 'include',
      }),
      invalidatesTags: ['Departments'],
    }),
    updateDepartment: builder.mutation<
      any,
      { id: string; data: Partial<DepartmentDataType> }
    >({
      query: ({ id, data }) => ({
        url: `/departments/${id}/`,
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Departments'],
    }),
    deleteDepartment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/departments/${id}/`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Departments'],
    }),
    addEmployeeToDepartment: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/departments/${id}/employees/`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Departments'],
    }),
    updateEmployeeInDepartment: builder.mutation<
      any,
      { id: string; employeeId: string; data: any }
    >({
      query: ({ id, employeeId, data }) => ({
        url: `/departments/${id}/employees/${employeeId}/`,
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Departments'],
    }),
    removeEmployeeFromDepartment: builder.mutation<
      any,
      { id: string; employeeId: string }
    >({
      query: ({ id, employeeId }) => ({
        url: `/departments/${id}/employees/${employeeId}/`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Departments'],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useAddEmployeeToDepartmentMutation,
  useRemoveEmployeeFromDepartmentMutation,
  useUpdateEmployeeInDepartmentMutation,
} = dealerManagementSlice;
