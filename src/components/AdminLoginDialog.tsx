import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

export const AdminLoginDialog = () => {
  const { isAdminLoggedIn, login, logout } = useAdmin();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng đến bảng điều khiển quản trị",
      });
      setPassword('');
      setOpen(false);
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Mật khẩu không đúng",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Đã đăng xuất",
      description: "Bạn đã đăng xuất thành công",
    });
  };

  if (isAdminLoggedIn) {
    return (
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Đăng xuất quản trị
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LogIn className="w-4 h-4 mr-2" />
          Đăng nhập quản trị
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-card-foreground">
            Đăng nhập quản trị
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Mật khẩu
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu quản trị"
              className="bg-muted border-border"
              autoComplete="current-password"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Hủy
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Đăng nhập
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};