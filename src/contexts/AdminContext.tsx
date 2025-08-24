import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, AdminSettings } from '@/types';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  posts: Post[];
  adminSettings: AdminSettings;
  login: (password: string) => boolean;
  logout: () => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'approved'>) => void;
  approvePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
}

const defaultAdminSettings: AdminSettings = {
  password: "admin123",
  leftButtonUrl: "https://example.com",
  leftButtonText: "Link 1",
  rightButtonUrl: "https://example.com",
  rightButtonText: "Link 2",
  customColors: {
    background: "hsl(210 11% 8%)",
    buttonHeading: "hsl(210 20% 95%)",
    buttonTitle: "hsl(210 20% 95%)",
    buttonTitleHover: "hsl(150 65% 55%)",
    buttonContent: "hsl(210 15% 85%)",
    postBackground: "hsl(210 15% 12%)",
    postHeading: "hsl(210 20% 95%)",
    postText: "hsl(210 15% 85%)"
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('portfolio-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt)
      })));
    }

    const savedSettings = localStorage.getItem('admin-settings');
    if (savedSettings) {
      setAdminSettings({ ...defaultAdminSettings, ...JSON.parse(savedSettings) });
    }

    // Add some demo posts
    if (!savedPosts) {
      const demoPosts: Post[] = [
        {
          id: '1',
          title: 'Advanced AR Setup',
          deviceTag: 'PC',
          category: 'AR',
          copyableText: 'M4A1-S | Blue Phosphor',
          description: 'High damage assault rifle perfect for mid-range combat. Excellent accuracy and manageable recoil.',
          postedBy: 'WeaponMaster',
          imageUrl: undefined,
          approved: true,
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Close Combat SMG',
          deviceTag: 'Mobile',
          category: 'SMG',
          copyableText: 'Vector | Neon Storm',
          description: 'Fast firing SMG designed for close quarters combat. High mobility and excellent hip fire accuracy.',
          postedBy: 'TacticPro',
          imageUrl: undefined,
          approved: true,
          createdAt: new Date()
        },
        {
          id: '3',
          title: 'Precision Sniper Build',
          deviceTag: 'PC',
          category: 'Sniper Rifle',
          copyableText: 'AWM | Arctic Warfare',
          description: 'One-shot potential sniper rifle for long-range elimination. Requires skill but devastating when mastered.',
          postedBy: 'SniperElite',
          imageUrl: undefined,
          approved: true,
          createdAt: new Date()
        }
      ];
      setPosts(demoPosts);
      localStorage.setItem('portfolio-posts', JSON.stringify(demoPosts));
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === adminSettings.password) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
  };

  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'approved'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
      approved: false
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('portfolio-posts', JSON.stringify(updatedPosts));
  };

  const approvePost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, approved: true } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('portfolio-posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('portfolio-posts', JSON.stringify(updatedPosts));
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    const newSettings = { ...adminSettings, ...settings };
    setAdminSettings(newSettings);
    localStorage.setItem('admin-settings', JSON.stringify(newSettings));
  };

  return (
    <AdminContext.Provider value={{
      isAdminLoggedIn,
      posts,
      adminSettings,
      login,
      logout,
      addPost,
      approvePost,
      deletePost,
      updateAdminSettings
    }}>
      {children}
    </AdminContext.Provider>
  );
};