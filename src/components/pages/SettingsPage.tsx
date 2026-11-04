import React, { useState } from 'react';
import {
  User,
  Settings,
  Lock,
  Trash2,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Code2,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    profile,
    updateProfile,
    changePassword,
    deleteAccount,
    logout,
    setActiveTab
  } = useApp();

  // Profile Edit State
  const [name, setName] = useState(profile.name || (currentUser ? currentUser.name : ''));
  const [education, setEducation] = useState(profile.education || '');
  const [collegeName, setCollegeName] = useState(profile.collegeName || '');
  const [department, setDepartment] = useState(profile.department || 'AI & DS');
  const [yearOfStudy, setYearOfStudy] = useState(profile.yearOfStudy || '3rd Year');
  const [skillsStr, setSkillsStr] = useState((profile.skills || []).join(', '));
  const [langsStr, setLangsStr] = useState((profile.programmingLanguages || []).join(', '));
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal || 'Data Scientist');

  // Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Delete State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Status Alerts
  const [profileSuccess, setProfileSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const languages = langsStr.split(',').map(s => s.trim()).filter(Boolean);

    updateProfile({
      ...profile,
      name,
      education,
      collegeName,
      department,
      yearOfStudy,
      skills,
      programmingLanguages: languages,
      careerGoal,
      isCompleted: true
    });

    setProfileSuccess('Profile and technical skills updated successfully!');
    setTimeout(() => setProfileSuccess(''), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    const res = await changePassword(oldPassword, newPassword);
    if (!res.success) {
      setPasswordError(res.message);
    } else {
      setPasswordSuccess(res.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordSuccess(''), 3000);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    await deleteAccount();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <Settings className="w-4 h-4" />
            <span>ACCOUNT & PRIVACY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Profile & Account Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your authenticated personal credentials, skills, and account lifecycle
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-950/80 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Info Pill */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center font-bold">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{currentUser?.name}</p>
            <p className="text-xs text-slate-400">{currentUser?.email}</p>
          </div>
        </div>
        <div className="text-xs text-slate-400">
          User ID: <span className="font-mono text-cyan-400">{currentUser?.id}</span>
        </div>
      </div>

      {/* Section 1: Edit Profile Information */}
      <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
        <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400 border-b border-slate-800 pb-3">
          <User className="w-5 h-5" />
          <span>Personal Information & Technical Profile</span>
        </div>

        {profileSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{profileSuccess}</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Education Degree</label>
              <input
                type="text"
                required
                value={education}
                onChange={e => setEducation(e.target.value)}
                placeholder="e.g. B.Tech in Artificial Intelligence & Data Science"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">College / University</label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={e => setCollegeName(e.target.value)}
                placeholder="e.g. State Institute of Technology"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="AI & DS">Artificial Intelligence & Data Science (AI & DS)</option>
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="Mathematics & Computing">Mathematics & Computing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Current Year of Study</label>
              <select
                value={yearOfStudy}
                onChange={e => setYearOfStudy(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="Final Year">Final Year</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Career Goal</label>
              <select
                value={careerGoal}
                onChange={e => setCareerGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-cyan-500/50 text-sm text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Software Developer">Software Developer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Technical Skills (Comma separated)
            </label>
            <input
              type="text"
              value={skillsStr}
              onChange={e => setSkillsStr(e.target.value)}
              placeholder="e.g. Python, SQL, Pandas, Machine Learning, Deep Learning, Statistics"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Programming Languages (Comma separated)
            </label>
            <input
              type="text"
              value={langsStr}
              onChange={e => setLangsStr(e.target.value)}
              placeholder="e.g. Python, SQL, C++, Java, JavaScript"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Update Profile & Skills</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Change Password */}
      <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center space-x-2 text-sm font-bold text-purple-400 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5" />
          <span>Security & Change Password</span>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">New Password (min. 6 characters)</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white transition shadow-md shadow-purple-600/25"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Section 3: Delete Account & Data Purge */}
      <div className="rounded-2xl bg-rose-950/20 border border-rose-900/40 p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center space-x-2 text-sm font-bold text-rose-400 border-b border-rose-900/30 pb-3">
          <Trash2 className="w-5 h-5" />
          <span>Danger Zone: Delete Account & Personal Data</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Deleting your account will immediately and permanently erase your student profile, skills, custom
          projects, roadmap progress, and all career analysis records. This action cannot be reversed.
        </p>

        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-900/40 hover:bg-rose-900/70 text-rose-300 border border-rose-700/60 transition"
          >
            I want to delete my account
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-800/80 space-y-3 max-w-md">
            <p className="text-xs text-rose-300 font-semibold">
              Type <span className="font-mono bg-rose-950 px-1 py-0.5 rounded text-white font-bold">DELETE</span> to confirm account deletion:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-rose-800 text-sm text-white focus:outline-none"
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold disabled:opacity-40 transition"
              >
                Permanently Delete Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
