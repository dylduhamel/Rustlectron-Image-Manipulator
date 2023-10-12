use std::io::Cursor;
use neon::prelude::*;
use image::DynamicImage;
use image::codecs::png::PngEncoder;
use image::ImageOutputFormat::Png;
use image::ImageFormat;
use base64;


/*
Helper functions for image processing
*/
pub fn load_image(path: &str) -> DynamicImage {
    image::open(path).unwrap()
}

pub fn save_image(img: &DynamicImage, path: &str) {
    img.save(path).unwrap();
}

pub fn apply_grayscale(img: &mut DynamicImage) {
    *img = img.grayscale();
}

// grayscale function for JavaScript use
fn grayscale(mut cx: FunctionContext) -> JsResult<JsString> {
    let img_path = cx.argument::<JsString>(0)?.value(&mut cx);
    let format = cx.argument::<JsString>(1)?.value(&mut cx);  // 2nd argument for desired format

    let mut img = load_image(&img_path);
    apply_grayscale(&mut img);

    let format = match format.as_str() {
        "png" => ImageFormat::Png,
        "jpeg" => ImageFormat::Jpeg,
        "bmp" => ImageFormat::Bmp,
        // Add more formats if the 'image' crate supports them.
        _ => return cx.throw_error("Unsupported format"),
    };

    let mut buffer = Cursor::new(Vec::new());
    img.write_to(&mut buffer, format).unwrap();

    let base64_img = base64::encode(&buffer.into_inner());

    Ok(cx.string(base64_img))
}


// Expose the grayscale function to JavaScript
register_module!(mut cx, {
    cx.export_function("grayscale", grayscale)
});