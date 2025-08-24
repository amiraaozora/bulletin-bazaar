import { useState } from 'react';
import { Settings, Lock, Palette, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

export const AdminPanel = () => {
  const { isAdminLoggedIn, adminSettings, updateAdminSettings } = useAdmin();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(adminSettings);

  if (!isAdminLoggedIn) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings(formData);
    toast({
      title: "Settings updated",
      description: "Admin settings have been saved successfully",
    });
    setOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('customColors.')) {
      const colorField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        customColors: {
          ...prev.customColors,
          [colorField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Admin Panel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-card-foreground">
            Admin Panel
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Custom Link Buttons
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leftButtonText">Left Button Text</Label>
                    <Input
                      id="leftButtonText"
                      value={formData.leftButtonText || ''}
                      onChange={(e) => handleChange('leftButtonText', e.target.value)}
                      placeholder="Link 1"
                      className="bg-muted border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leftButtonUrl">Left Button URL</Label>
                    <Input
                      id="leftButtonUrl"
                      value={formData.leftButtonUrl || ''}
                      onChange={(e) => handleChange('leftButtonUrl', e.target.value)}
                      placeholder="https://example.com"
                      className="bg-muted border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rightButtonText">Right Button Text</Label>
                    <Input
                      id="rightButtonText"
                      value={formData.rightButtonText || ''}
                      onChange={(e) => handleChange('rightButtonText', e.target.value)}
                      placeholder="Link 2"
                      className="bg-muted border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rightButtonUrl">Right Button URL</Label>
                    <Input
                      id="rightButtonUrl"
                      value={formData.rightButtonUrl || ''}
                      onChange={(e) => handleChange('rightButtonUrl', e.target.value)}
                      placeholder="https://example.com"
                      className="bg-muted border-border"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password Settings
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Color Customization
                </h3>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Button Colors</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buttonHeading">Button Heading</Label>
                      <Input
                        id="buttonHeading"
                        value={formData.customColors.buttonHeading}
                        onChange={(e) => handleChange('customColors.buttonHeading', e.target.value)}
                        placeholder="hsl(210 20% 95%)"
                        className="bg-muted border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buttonTitle">Button Title</Label>
                      <Input
                        id="buttonTitle"
                        value={formData.customColors.buttonTitle}
                        onChange={(e) => handleChange('customColors.buttonTitle', e.target.value)}
                        placeholder="hsl(210 20% 95%)"
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>

                  <h4 className="font-medium pt-4">Post Colors</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postBackground">Post Background</Label>
                      <Input
                        id="postBackground"
                        value={formData.customColors.postBackground}
                        onChange={(e) => handleChange('customColors.postBackground', e.target.value)}
                        placeholder="hsl(210 15% 12%)"
                        className="bg-muted border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postHeading">Post Heading</Label>
                      <Input
                        id="postHeading"
                        value={formData.customColors.postHeading}
                        onChange={(e) => handleChange('customColors.postHeading', e.target.value)}
                        placeholder="hsl(210 20% 95%)"
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="flex gap-3 pt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" variant="gradient" className="flex-1">
                Save Settings
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};