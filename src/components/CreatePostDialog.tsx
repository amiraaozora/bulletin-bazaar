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
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ các trường bắt buộc",
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
      title: "Đã tạo bài viết",
      description: "Bài viết của bạn đã được gửi để phê duyệt",
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
          Tạo bài viết mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-card-foreground">
            Tạo bài viết mới
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deviceTag" className="text-sm font-medium">
                Nền tảng *
              </Label>
              <Select value={formData.deviceTag} onValueChange={(value) => handleChange('deviceTag', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nền tảng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PC">PC</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Loại vũ khí *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại vũ khí" />
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
              Tiêu đề *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Nhập tiêu đề bài viết"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="copyableText" className="text-sm font-medium">
              Mã vũ khí *
            </Label>
            <Input
              id="copyableText"
              value={formData.copyableText}
              onChange={(e) => handleChange('copyableText', e.target.value)}
              placeholder="Mã vũ khí có thể sao chép"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Nhập mô tả bài viết..."
              className="bg-muted border-border h-20 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postedBy" className="text-sm font-medium">
              Người đăng *
            </Label>
            <Input
              id="postedBy"
              value={formData.postedBy}
              onChange={(e) => handleChange('postedBy', e.target.value)}
              placeholder="Tên hoặc nickname của bạn"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-sm font-medium">
              Link hình ảnh minh họa (Tùy chọn)
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
              Hủy
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Tạo bài viết
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};