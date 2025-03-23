'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DogHealthData } from '../types';

const schema = yup.object().shape({
  age: yup
    .number()
    .required('Age is required')
    .min(0, 'Age must be positive')
    .max(30, 'Age must be less than 30 years'),
  weight: yup
    .number()
    .required('Weight is required')
    .min(0, 'Weight must be positive')
    .max(200, 'Weight must be less than 200 kg'),
  height: yup
    .number()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .min(0, 'Height must be positive')
    .max(150, 'Height must be less than 150 cm'),
  gender: yup.string().required('Gender is required').oneOf(['male', 'female']),
  activityLevel: yup
    .string()
    .required('Activity level is required')
    .oneOf(['low', 'moderate', 'high']),
  diet: yup.string().required('Diet information is required'),
  healthIssues: yup.string().nullable(),
});

interface HealthFormProps {
  onSubmit: (data: DogHealthData) => void;
  isLoading?: boolean;
}

export default function HealthForm({ onSubmit, isLoading = false }: HealthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DogHealthData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age (years)
        </label>
        <input
          type="number"
          id="age"
          {...register('age')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          step="0.1"
          {...register('weight')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height at shoulder (cm) - Optional
        </label>
        <input
          type="number"
          id="height"
          {...register('height')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.height && (
          <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="male"
              {...register('gender')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="female"
              {...register('gender')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
          Activity Level
        </label>
        <select
          id="activityLevel"
          {...register('activityLevel')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select activity level</option>
          <option value="low">Low (less than 30 minutes daily)</option>
          <option value="moderate">Moderate (30-60 minutes daily)</option>
          <option value="high">High (more than 60 minutes daily)</option>
        </select>
        {errors.activityLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.activityLevel.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="diet" className="block text-sm font-medium text-gray-700">
          Current Diet
        </label>
        <textarea
          id="diet"
          rows={3}
          {...register('diet')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Dry kibble twice daily, occasional treats"
        />
        {errors.diet && (
          <p className="mt-1 text-sm text-red-600">{errors.diet.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="healthIssues" className="block text-sm font-medium text-gray-700">
          Known Health Issues (Optional)
        </label>
        <textarea
          id="healthIssues"
          rows={2}
          {...register('healthIssues')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Allergies, joint problems"
        />
        {errors.healthIssues && (
          <p className="mt-1 text-sm text-red-600">{errors.healthIssues.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Generate Health Report'}
        </button>
      </div>
    </form>
  );
} 