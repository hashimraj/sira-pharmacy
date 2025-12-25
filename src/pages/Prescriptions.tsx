import { useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, MessageCircle, X, Image } from 'lucide-react';

const WHATSAPP_NUMBER = '0114542511';

const Prescriptions = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendViaWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello, I have a prescription to share. I have ${files.length} file(s) ready to send:\n\n${files.map(f => `• ${f.name}`).join('\n')}\n\nPlease let me know how to proceed with sharing my prescription.`
    );
    window.open(`https://wa.me/254${WHATSAPP_NUMBER.slice(1)}?text=${message}`, '_blank');
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Prescription Services</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Upload your prescription and share it with us via WhatsApp. Our licensed pharmacists will verify and prepare your medications.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Upload Your Prescription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div 
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={openFilePicker}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Click to select files</p>
                <p className="text-sm text-muted-foreground">
                  Supports images (JPG, PNG) and PDF files
                </p>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <p className="font-medium">Selected Files ({files.length})</p>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Image className="h-5 w-5 text-primary" />
                      <span className="flex-1 text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Send via WhatsApp */}
              <div className="pt-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSendViaWhatsApp}
                  disabled={files.length === 0}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Prescription via WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  You'll be redirected to WhatsApp to share your prescription files
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Select Your Files', desc: 'Click to select your prescription images or PDF files' },
                  { step: 2, title: 'Send via WhatsApp', desc: 'Click the button to open WhatsApp and share your files' },
                  { step: 3, title: 'Pharmacist Review', desc: 'Our team will verify your prescription and prepare your order' },
                  { step: 4, title: 'Confirm & Receive', desc: 'Confirm your order details and receive your medications' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Prescriptions;
