import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
  
  if (diffInSeconds < 0) {
    const pastSeconds = Math.abs(diffInSeconds);
    if (pastSeconds < 60) return 'just now';
    if (pastSeconds < 3600) return `${Math.floor(pastSeconds / 60)} minutes ago`;
    if (pastSeconds < 86400) return `${Math.floor(pastSeconds / 3600)} hours ago`;
    return `${Math.floor(pastSeconds / 86400)} days ago`;
  }
  
  if (diffInSeconds < 60) return 'in a few seconds';
  if (diffInSeconds < 3600) return `in ${Math.floor(diffInSeconds / 60)} minutes`;
  if (diffInSeconds < 86400) return `in ${Math.floor(diffInSeconds / 3600)} hours`;
  return `in ${Math.floor(diffInSeconds / 86400)} days`;
}

export function getStatusColor(status: string): string {
  const statusColors = {
    'To Contact': 'bg-gray-100 text-gray-800',
    'Application Sent': 'bg-blue-100 text-blue-800',
    'Waiting Reply': 'bg-yellow-100 text-yellow-800',
    'Phone Screen Scheduled': 'bg-purple-100 text-purple-800',
    'Phone Screen Completed': 'bg-purple-100 text-purple-800',
    'Interview Scheduled': 'bg-orange-100 text-orange-800',
    'Interview Completed': 'bg-orange-100 text-orange-800',
    'Final Interview': 'bg-red-100 text-red-800',
    'Offer Received': 'bg-green-100 text-green-800',
    'Offer Negotiating': 'bg-green-100 text-green-800',
    'Offer Accepted': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Withdrawn': 'bg-gray-100 text-gray-800',
    'Archived': 'bg-gray-100 text-gray-800',
  };
  
  return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
}

export function getPriorityColor(priority: string): string {
  const priorityColors = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800',
  };
  
  return priorityColors[priority as keyof typeof priorityColors] || 'bg-gray-100 text-gray-800';
}