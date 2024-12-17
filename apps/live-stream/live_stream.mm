#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

// A simple frame capture delegate class
@interface FrameCaptureDelegate : NSObject <AVCaptureVideoDataOutputSampleBufferDelegate>
@property (nonatomic, assign) int frameCount;
@end

@implementation FrameCaptureDelegate

- (instancetype)init {
    self = [super init];
    if (self) {
        _frameCount = 0;
    }
    return self;
}

- (void)captureOutput:(AVCaptureOutput *)output
didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
       fromConnection:(AVCaptureConnection *)connection {
    if (self.frameCount >= 25) return; // Stop after 25 frames

    // Get image buffer
    CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CVPixelBufferLockBaseAddress(imageBuffer, kCVPixelBufferLock_ReadOnly);
    
    // Get dimensions
    size_t width = CVPixelBufferGetWidth(imageBuffer);
    size_t height = CVPixelBufferGetHeight(imageBuffer);
    size_t bytesPerRow = CVPixelBufferGetBytesPerRow(imageBuffer);
    
    // Get base address of the buffer
    uint8_t *baseAddress = (uint8_t *)CVPixelBufferGetBaseAddress(imageBuffer);
    
    // Convert frame to RGB (assuming it is in BGRA format)
    uint8_t *rgbData = (uint8_t *)malloc(width * height * 3);
    for (size_t y = 0; y < height; ++y) {
        uint8_t *row = baseAddress + y * bytesPerRow;
        for (size_t x = 0; x < width; ++x) {
            size_t pixelIndex = x * 4;
            size_t rgbIndex = y * width * 3 + x * 3;
            rgbData[rgbIndex + 0] = row[pixelIndex + 2]; // R
            rgbData[rgbIndex + 1] = row[pixelIndex + 1]; // G
            rgbData[rgbIndex + 2] = row[pixelIndex + 0]; // B
        }
    }

    // Save frame to PPM
    NSString *filename = [NSString stringWithFormat:@"frame_%02d.ppm", self.frameCount];
    FILE *file = fopen([filename UTF8String], "wb");
    if (file) {
        fprintf(file, "P6\n%zu %zu\n255\n", width, height);
        fwrite(rgbData, 1, width * height * 3, file);
        fclose(file);
        NSLog(@"Saved: %@", filename);
    } else {
        NSLog(@"Failed to save: %@", filename);
    }

    free(rgbData);
    CVPixelBufferUnlockBaseAddress(imageBuffer, kCVPixelBufferLock_ReadOnly);

    self.frameCount++;
}
@end

int main() {
    @autoreleasepool {
        // Initialize capture session
        AVCaptureSession *session = [[AVCaptureSession alloc] init];
        session.sessionPreset = AVCaptureSessionPresetHigh;

        // Get the default camera device
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        NSError *error = nil;

        // Create input for the camera
        AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:device error:&error];
        if (!input) {
            NSLog(@"Error: %@", error.localizedDescription);
            return -1;
        }
        [session addInput:input];

        // Create output for frames
        AVCaptureVideoDataOutput *output = [[AVCaptureVideoDataOutput alloc] init];
        [output setAlwaysDiscardsLateVideoFrames:YES];
        [output setVideoSettings:@{(id)kCVPixelBufferPixelFormatTypeKey: @(kCVPixelFormatType_32BGRA)}];
        [session addOutput:output];

        // Create delegate for frame processing
        FrameCaptureDelegate *delegate = [[FrameCaptureDelegate alloc] init];
        dispatch_queue_t queue = dispatch_queue_create("FrameCaptureQueue", NULL);
        [output setSampleBufferDelegate:delegate queue:queue];

        // Start session
        [session startRunning];
        NSLog(@"Starting capture...");

        // Wait for the 25 frames to be captured
        while (delegate.frameCount < 25) {
            [NSThread sleepForTimeInterval:0.1];
        }

        // Stop session
        [session stopRunning];
        NSLog(@"Capture complete!");

        return 0;
    }
}
