class JournalController < ApplicationController
  def index
  end

  def new
  end

  def edit
    if params[:id]
      @journal = params[:id]
    end
  end

  def read

  end

  def save

  end
end
