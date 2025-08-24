import { useState } from 'react';
import { Copy, Image, Trash2, Check } from 'lucide-react';
import { Post } from '@/types';
import { TagBadge } from './TagBadge';
import { Button } from './ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { isAdminLoggedIn, deletePost, approvePost } = useAdmin();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(post.copyableText);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleImageClick = () => {
    if (post.imageUrl) {
      window.open(post.imageUrl, '_blank');
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      toast({
        title: "Post deleted",
        description: "The post has been removed successfully",
      });
    }
  };

  const handleApprove = () => {
    approvePost(post.id);
    toast({
      title: "Post approved",
      description: "The post is now visible to all users",
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
      {/* Admin Controls */}
      {isAdminLoggedIn && (
        <div className="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!post.approved && (
            <Button
              size="sm"
              variant="default"
              onClick={handleApprove}
              className="h-8 text-xs"
            >
              <Check className="w-3 h-3 mr-1" />
              Approve
            </Button>
          )}
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            className="h-8 text-xs"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      )}

      {/* Tag and Title */}
      <div className="flex items-center gap-3 mb-3">
        <TagBadge tag={post.deviceTag} />
        <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1">
          {post.title}
        </h3>
      </div>

      {/* Copyable Text Field */}
      <div className="relative mb-4">
        <div className="flex items-center bg-muted rounded-lg p-3 border border-border">
          <span className="text-sm text-muted-foreground flex-1 font-mono">
            {post.copyableText}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 ml-2 hover:bg-primary/20"
          >
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Description Box */}
      <div className="bg-muted/50 rounded-lg p-4 h-24 mb-4 overflow-hidden border border-border/50">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {post.description || "No description provided."}
        </p>
      </div>

      {/* Posted By */}
      <p className="text-xs text-muted-foreground mb-4 italic">
        Posted by {post.postedBy}
      </p>

      {/* Image Button */}
      <Button
        variant={post.imageUrl ? "default" : "secondary"}
        size="sm"
        onClick={handleImageClick}
        disabled={!post.imageUrl}
        className="w-full justify-center"
      >
        <Image className="w-4 h-4 mr-2" />
        {post.imageUrl ? "View Attachment" : "No Attachments"}
      </Button>

      {/* Approval Status for Admin */}
      {isAdminLoggedIn && !post.approved && (
        <div className="mt-3 px-3 py-1 bg-destructive/20 border border-destructive/30 rounded-lg">
          <p className="text-xs text-destructive font-medium">Pending Approval</p>
        </div>
      )}
    </div>
  );
};