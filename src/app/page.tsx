'use client';

import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  ClockIcon,
  PlusIcon,
  EyeIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  // In the future, we'll fetch real data here
  const stats = {
    totalContacts: 0,
    activeApplications: 0,
    upcomingInterviews: 0,
    pendingFollowUps: 0,
  };

  const quickActions = [
    {
      title: 'Add New Contact',
      description: 'Start tracking a new opportunity',
      href: '/contacts/new',
      icon: PlusIcon,
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'View All Contacts',
      description: 'Manage your job applications',
      href: '/contacts',
      icon: EyeIcon,
      gradient: 'from-green-500 to-green-600',
      hoverGradient: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'Interview Schedule',
      description: 'Manage upcoming interviews',
      href: '/interviews',
      icon: CalendarIcon,
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  const recentActivity = [
    // Placeholder data - will be replaced with real data later
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Job Hunt Command Center</h1>
                <p className="text-white/90 text-lg">
                  Track applications, manage contacts, and land your next game development role! 🎮
                </p>
                <div className="flex items-center mt-4 space-x-4 text-white/80">
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Game Development</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Remote / Georgia</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="text-6xl opacity-20">🚀</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { 
            title: 'Total Contacts', 
            value: stats.totalContacts, 
            icon: UsersIcon, 
            color: 'text-blue-600', 
            bgColor: 'bg-blue-100',
            trend: '+0% from last week'
          },
          { 
            title: 'Active Applications', 
            value: stats.activeApplications, 
            icon: DocumentTextIcon, 
            color: 'text-green-600', 
            bgColor: 'bg-green-100',
            trend: '+0% from last week'
          },
          { 
            title: 'Upcoming Interviews', 
            value: stats.upcomingInterviews, 
            icon: BriefcaseIcon, 
            color: 'text-purple-600', 
            bgColor: 'bg-purple-100',
            trend: 'Next: Not scheduled'
          },
          { 
            title: 'Follow-ups Due', 
            value: stats.pendingFollowUps, 
            icon: ClockIcon, 
            color: 'text-orange-600', 
            bgColor: 'bg-orange-100',
            trend: 'Due today: 0'
          }
  ].map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <motion.div
                  key={action.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={action.href}
                    className={`block p-6 rounded-lg bg-gradient-to-br ${action.gradient} ${action.hoverGradient} text-white transition-all duration-200 shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-white/20 rounded-lg mr-4">
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{action.title}</p>
                        <p className="text-sm text-white/80">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <EmptyState
                  title="No recent activity yet"
                  description="Start by adding your first job contact to see activity here"
                  actionHref="/contacts/add"
                  actionLabel="Add Your First Contact"
                  icon={<span>🎯</span>}
                />
              ) : (
                <div className="space-y-4">
                  {/* Activity items will go here */}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Add your first contact</p>
                    <p className="text-sm text-gray-600">Start tracking job opportunities</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Schedule interviews</p>
                    <p className="text-sm text-gray-600">Manage your interview pipeline</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Track follow-ups</p>
                    <p className="text-sm text-gray-600">Never miss an opportunity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}