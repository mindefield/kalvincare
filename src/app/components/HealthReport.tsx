'use client';

import React from 'react';
import { HealthReport as HealthReportType } from '../types';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface HealthReportProps {
  report: HealthReportType;
}

export default function HealthReport({ report }: HealthReportProps) {
  const getWeightStatusColor = (status: string) => {
    switch (status) {
      case 'underweight':
        return 'text-yellow-500';
      case 'ideal':
        return 'text-green-500';
      case 'overweight':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breed Information */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Breed Analysis</h2>
        <div className="space-y-4">
          {report.breeds.map((breed, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold text-gray-900">
                {breed.name} ({Math.round(breed.confidence * 100)}% confidence)
              </h3>
              {breed.temperament && (
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Temperament:</span>{' '}
                  {breed.temperament.join(', ')}
                </p>
              )}
              {breed.size && (
                <p className="text-gray-600">
                  <span className="font-medium">Size:</span> {breed.size}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Health Metrics */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Assessment</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-medium text-gray-900">Weight Status:</span>
            <span className={`ml-2 ${getWeightStatusColor(report.weightStatus)}`}>
              {report.weightStatus.charAt(0).toUpperCase() + report.weightStatus.slice(1)}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-900">Overall Health Score:</span>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${report.overallHealthScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{report.overallHealthScore}/100</p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
        
        {/* Activity Recommendations */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity & Exercise</h3>
          <ul className="space-y-2">
            {report.activityRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Diet Recommendations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Diet & Nutrition</h3>
          <ul className="space-y-2">
            {report.dietRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alerts */}
      {report.alerts.length > 0 && (
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Alerts</h2>
          <ul className="space-y-2">
            {report.alerts.map((alert, index) => (
              <li key={index} className="flex items-start">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <span className="text-gray-600">{alert}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
} 