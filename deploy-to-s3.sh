#!/bin/bash

# Variables
BUCKET_NAME="staticdashboardstack-travelgigdashboardstaticdashb-fcizjzevbacl"
BUILD_DIR="out"
CLOUDFRONT_DISTRIBUTION_ID='E2MKL7EIH7LIEU'

# Build and export the static site
npm run build

# Sync the build directory with the S3 bucket
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME --delete

# Copy all HTML files without the .html extension
#find $BUILD_DIR -name '*.html' | while read file; do
#  newfile=$(echo $file | sed 's/\.html$//')
#  aws s3 cp "$file" "s3://$BUCKET_NAME/${newfile#$BUILD_DIR/}"
#done

find "$BUILD_DIR" -name '*.html' | while read -r file; do
  newfile=$(echo "$file" | sed 's/\.html$//')
  echo "aws s3 cp \"$file\" \"s3://$BUCKET_NAME/${newfile#$BUILD_DIR/}\""
done | xargs -P 4 -I {} bash -c "{}"


# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deployment to S3 bucket $BUCKET_NAME completed successfully."
echo "CloudFront cache invalidation initiated."
