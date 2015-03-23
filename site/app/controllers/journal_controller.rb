class JournalController < ApplicationController
  def index
    @journals = Journal.all
  end

  # Form - for new entries
  def new
    @journal = Journal.new
  end

  # Form - Allows updates to be made
  def edit
    if params[:id]
      @journal = params[:id]
    end
  end

  # Display a published journal
  def read

  end

  # Saves a journal to the db
  def save
    # use custom layout
    skip_before_filter :verify_authenticity_token, :only => [:set_status]
    render :action => 'save', :layout => false
  end
end
