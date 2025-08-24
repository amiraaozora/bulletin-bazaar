import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { PostCategory, DeviceTag } from '@/types';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

const categories: PostCategory[] = [
  "AR", 
  "SMG", 
  "Shotgun", 
  "LMG", 
  "Sniper Rifle", 
  "Marksman Rifle", 
  "Hand Gun"
];

export const CreatePostDialog = () => {
  const { addPost } = useAdmin();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    deviceTag: '' as DeviceTag,
    category: '' as PostCategory,
    copyableText: '',
    description: '',
    postedBy: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.deviceTag || !formData.category || !formData.copyableText || !formData.postedBy) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addPost({
      title: formData.title,
      deviceTag: formData.deviceTag,
      category: formData.category,
      copyableText: formData.copyableText,
      description: formData.description,
      postedBy: formData.postedBy,
      imageUrl: formData.imageUrl || undefined,
    });

    toast({
      title: "Post created",
      description: "Your post has been submitted for approval",
    });

    setFormData({
      title: '',
      deviceTag: '' as DeviceTag,
      category: '' as PostCategory,
      copyableText: '',
      description: '',
      postedBy: '',
      imageUrl: ''
    });
    
    setOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-card-foreground">
            Create New Post
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deviceTag" className="text-sm font-medium">
                Device Tag *
              </Label>
              <Select value={formData.deviceTag} onValueChange={(value) => handleChange('deviceTag', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PC">PC</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Post Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter post title"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="copyableText" className="text-sm font-medium">
              Copyable Text *
            </Label>
            <Input
              id="copyableText"
              value={formData.copyableText}
              onChange={(e) => handleChange('copyableText', e.target.value)}
              placeholder="Text that users can copy"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter post description..."
              className="bg-muted border-border h-20 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postedBy" className="text-sm font-medium">
              Posted By *
            </Label>
            <Input
              id="postedBy"
              value={formData.postedBy}
              onChange={(e) => handleChange('postedBy', e.target.value)}
              placeholder="Your name or username"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-sm font-medium">
              Image URL (Optional)
            </Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-muted border-border"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Create Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};