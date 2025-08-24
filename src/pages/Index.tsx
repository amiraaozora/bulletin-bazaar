import { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { PostCategory } from '@/types';
import { CategoryTabs } from '@/components/CategoryTabs';
import { PostCard } from '@/components/PostCard';
import { CreatePostDialog } from '@/components/CreatePostDialog';
import { AdminLoginDialog } from '@/components/AdminLoginDialog';
import { AdminPanel } from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const POSTS_PER_PAGE = 12;

const Index = () => {
  const { posts, isAdminLoggedIn, adminSettings } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>("All");
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);

  // Filter posts based on category and approval status
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => post.approved);
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [posts, selectedCategory]);

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = filteredPosts.length > displayCount;

  const loadMore = () => {
    setDisplayCount(prev => prev + POSTS_PER_PAGE);
  };

  const handleCategoryChange = (category: PostCategory) => {
    setSelectedCategory(category);
    setDisplayCount(POSTS_PER_PAGE);
  };

  const openExternalLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation buttons */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left side - Custom link buttons */}
            <div className="flex gap-3">
              {adminSettings.leftButtonText && adminSettings.leftButtonUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openExternalLink(adminSettings.leftButtonUrl)}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {adminSettings.leftButtonText}
                </Button>
              )}
              {adminSettings.rightButtonText && adminSettings.rightButtonUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openExternalLink(adminSettings.rightButtonUrl)}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {adminSettings.rightButtonText}
                </Button>
              )}
            </div>

            {/* Right side - Admin controls */}
            <div className="flex gap-3">
              <CreatePostDialog />
              <AdminLoginDialog />
              {isAdminLoggedIn && <AdminPanel />}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Tabs */}
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Posts Grid */}
        {displayedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center">
                <Button
                  variant="gradient"
                  onClick={loadMore}
                  className="px-8 py-3"
                >
                  Load More Posts
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-card rounded-xl p-8 border border-border max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All" 
                  ? "No approved posts available yet."
                  : `No approved posts in "${selectedCategory}" category.`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
