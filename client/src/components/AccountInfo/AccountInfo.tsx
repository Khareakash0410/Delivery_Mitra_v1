import { useEffect, useState, useRef } from 'react';
import { Mail, Phone, User, Save, Edit, Camera } from "lucide-react";
import styles from '../../pages/AccountPage/Account.module.css';
import apiEndpoints from '../../api/Config';
import useGetApi from '../../api/useGetApi';
import usePutApi from '../../api/usePutApi';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
}

const AccountInfo: React.FC = () => {

  const {user: storeUser, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const { data, error, setEnabled } = useGetApi(
    `${apiEndpoints.AUTH.GET_MY_PROFILE}`,
  );

  const [user, setUser] = useState<UserProfile | null>(null);
  const [originalUser, setOriginalUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {data: updateData, error: updateError, loading: updateLoading, setEnabled: updateEnabled} = usePutApi(`${apiEndpoints.AUTH.UPDATE_PROFILE}`, {name: user?.name, email: user?.email, profilePic: user?.profilePic});

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUser((prev) => ({
      ...prev!,
      [field]: value
    }));
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target?.files?.[0];
  if (!file) return;
  setAvatarPreview(URL.createObjectURL(file));
  const formData = new FormData();
  formData.append("image", file);
    try {
        const { data } = await axios.post(
      apiEndpoints.AUTH.UPLOAD_PROFILE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      }
    );
    toast.success(data?.message);
    setUser((prev) => ({
      ...prev!,
      profilePic: data?.imageUrl,
    }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
    updateEnabled(true);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setUser(originalUser);
      setAvatarPreview(null);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data?.data?.user);
      setOriginalUser(data?.data?.user);
      setEnabled(false);
    }
    if (error) {
      setEnabled(false);
    }
  }, [data, error]);

  useEffect(() => {
    if(updateData) {
      toast.success(updateData?.message);
      setOriginalUser(updateData?.data?.user);
      updateEnabled(false);
    }
    if(updateError) {
      toast.error(updateError?.message);
      updateEnabled(false);
    }
  }, [updateData, updateError]);

  if(!storeUser || !isAuthenticated) {
    return <Navigate to={"/auth"}/>
  };



  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Your Profile</h1>
        <div className={styles.headerActions}>
          <button 
            className={styles.headerButton}
            onClick={handleEditToggle}
          >
            <Edit className={styles.headerIcon} />
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar} onClick={handleAvatarClick}>
              <img 
                src={avatarPreview || user?.profilePic} 
                alt="Profile" 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            {isEditing && (
              <div className={styles.editBadge}>
                <Camera className={styles.editBadgeIcon} />
              </div>
            )}
          </div>
        </div>
        
        {/* Hidden file input for avatar upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      {/* Profile Details Section */}
      <div className={styles.dropdownContent}>

        <div className={styles.profileItem}>
          <User className={styles.profileIcon} />
          <div className={styles.profileInfo}>
            <span className={styles.profileLabel}>Username</span>
            {isEditing ? (
              <input
                type="text"
                value={user?.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={styles.profileInput}
                placeholder="Enter your name"
              />
            ) : (
              <span className={styles.profileValue}>{user?.name}</span>
            )}
          </div>
        </div>

        <div className={styles.profileItem}>
          <Phone className={styles.profileIcon} />
          <div className={styles.profileInfo}>
            <span className={styles.profileLabel}>Phone</span>
            {isEditing ? (
              <input
                type="tel"
                value={user?.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={styles.profileInput}
                placeholder="Enter your phone number"
                disabled
              />
            ) : (
              <span className={styles.profileValue}>{user?.phone}</span>
            )}
          </div>
        </div>

        <div className={styles.profileItem}>
          <Mail className={styles.profileIcon} />
          <div className={styles.profileInfo}>
            <span className={styles.profileLabel}>Email</span>
            {isEditing ? (
              <input
                type="email"
                value={user?.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={styles.profileInput}
                placeholder="Enter your email"
              />
            ) : (
              <span className={styles.profileValue}>{user?.email}</span>
            )}
          </div>
        </div>

        {isEditing && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              className={styles.updateButton}
              onClick={handleUpdateProfile}
            >
              <Save className={styles.editIcon} />
             {updateLoading ?  "Updating": "Update Profile"}
            </button>
            <button
              className={styles.editButton}
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default AccountInfo;