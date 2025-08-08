"use client";

import { useSignOut } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BookOpen, Code, LogOut, Plus, Settings, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { useCurrentUser } from "../hooks/use-dashboard";
import { DashboardStats } from "./dashboard-stats";
import { RecentActivity } from "./recent-activity";

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const signOut = useSignOut();
  const { data: user, isLoading } = useCurrentUser();

  const handleSignOut = () => {
    signOut.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to access the dashboard</p>
        </div>
      </div>
    );
  }

  const isTeacher = user.role === "teacher";
  const isStudent = user.role === "student";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Coder</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Overview</span>
            </button>

            {isTeacher && (
              <button
                onClick={() => setActiveTab("classes")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "classes"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="h-5 w-5" />
                <span>My Classes</span>
              </button>
            )}

            {isStudent && (
              <button
                onClick={() => setActiveTab("challenges")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "challenges"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Code className="h-5 w-5" />
                <span>Challenges</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("progress")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "progress"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span>Progress</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              disabled={signOut.isPending}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "classes" && "My Classes"}
                {activeTab === "challenges" && "Challenges"}
                {activeTab === "progress" && "Progress"}
                {activeTab === "settings" && "Settings"}
              </h1>
              <p className="text-gray-600">
                Welcome back, {user.name}! Here's what's happening today.
              </p>
            </div>

            {activeTab === "overview" && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {isTeacher ? "Create Class" : "Start Challenge"}
              </Button>
            )}
          </div>

          {/* Content based on active tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <DashboardStats />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity />
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Code className="h-4 w-4 mr-2" />
                        {isTeacher ? "Create New Challenge" : "Start Next Challenge"}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Progress
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "classes" && isTeacher && (
            <Card>
              <CardHeader>
                <CardTitle>My Classes</CardTitle>
                <CardDescription>
                  Manage your classes and students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No classes created yet</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "challenges" && isStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Available Challenges</CardTitle>
                <CardDescription>
                  Complete challenges to improve your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No challenges available</p>
                  <p className="text-sm">Check back later for new challenges</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "progress" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  Track your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No progress data available</p>
                  <p className="text-sm">Complete challenges to see your progress</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Settings coming soon</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
