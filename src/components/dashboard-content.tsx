'use client';

import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, LogOut, Plus, Settings, Trophy, Users } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const isTeacher = user.role === 'teacher';
  const isStudent = user.role === 'student';

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
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Overview</span>
            </button>
            
            {isTeacher && (
              <button
                onClick={() => setActiveTab('classes')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'classes'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>My Classes</span>
              </button>
            )}
            
            {isStudent && (
              <button
                onClick={() => setActiveTab('challenges')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'challenges'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Code className="h-5 w-5" />
                <span>Challenges</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('progress')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'progress'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span>Progress</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome back, {user.name}!
              </h1>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isTeacher && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span>My Classes</span>
                      </CardTitle>
                      <CardDescription>
                        Manage your classes and students
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">3</div>
                      <p className="text-sm text-gray-600">Active classes</p>
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Class
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                {isStudent && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Code className="h-5 w-5 text-green-600" />
                        <span>Challenges</span>
                      </CardTitle>
                      <CardDescription>
                        Continue your learning journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <p className="text-sm text-gray-600">Challenges completed</p>
                      <Button className="mt-4" size="sm">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <span>Progress</span>
                    </CardTitle>
                    <CardDescription>
                      Track your learning progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">75%</div>
                    <p className="text-sm text-gray-600">Overall completion</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'classes' && isTeacher && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Class
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>JavaScript Fundamentals</CardTitle>
                    <CardDescription>Learn the basics of JavaScript programming</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">15 students</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>React Development</CardTitle>
                    <CardDescription>Build modern web applications with React</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">8 students</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Python for Beginners</CardTitle>
                    <CardDescription>Introduction to Python programming</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">22 students</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'challenges' && isStudent && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Coding Challenges</h1>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hello World</CardTitle>
                    <CardDescription>Write your first JavaScript function</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">Completed</span>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Variables & Data Types</CardTitle>
                    <CardDescription>Learn about variables and different data types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-600">In Progress</span>
                      <Button size="sm">Continue</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Functions</CardTitle>
                    <CardDescription>Create and use functions in JavaScript</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Not Started</span>
                      <Button size="sm">Start</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'progress' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Learning Progress</h1>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>Your learning journey so far</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>JavaScript Fundamentals</span>
                          <span>80%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>React Development</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Python Basics</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your latest accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">First Challenge Completed</p>
                          <p className="text-xs text-gray-600">2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">5-Day Streak</p>
                          <p className="text-xs text-gray-600">1 week ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">Perfect Score</p>
                          <p className="text-xs text-gray-600">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Account Settings</h1>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-sm text-gray-600">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 