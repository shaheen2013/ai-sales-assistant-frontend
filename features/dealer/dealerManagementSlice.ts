import { DepartmentDataType } from '@/types/dealerManagementSliceType';
import { apiSlice } from '../api/apiSlice';

export const dealerManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<any, void>({
      query: () => ({
        url: '/departments/',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['departmentsData'],
    }),
    getDepartmentById: builder.query<any, string>({
      query: (id) => ({
        url: `/departments/${id}/`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['departmentsData'],
    }),
    addDepartment: builder.mutation<any, DepartmentDataType>({
      query: (department) => ({
        url: '/departments/',
        method: 'POST',
        body: department,
        credentials: 'include',
      }),
      invalidatesTags: ['departmentsData'],
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
      invalidatesTags: ['departmentsData'],
    }),
    deleteDepartment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/departments/${id}/`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['departmentsData'],
    }),
    addEmployeeToDepartment: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/departments/${id}/employees/`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['departmentsData'],
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
      invalidatesTags: ['departmentsData'],
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
      invalidatesTags: ['departmentsData'],
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
