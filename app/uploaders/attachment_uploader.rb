# encoding: utf-8

class AttachmentUploader < CarrierWave::Uploader::Base

  include Cloudinary::CarrierWave

  def extension_white_list
    %w(jpg jpeg gif png pdf txt)
  end

  CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

end
