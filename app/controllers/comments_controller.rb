class CommentsController < ApplicationController
  # GET /comments
  # GET /comments.json
  respond_to :json
  def index
    #puts params.inspect
    #post = Post.find(params[:id])
    respond_with(@comments = Comments.all)
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    @comment = Comment.find(params[:id])
    respond_with(@comment)
  end

  
  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new()
    @comment.comment = params[:comment]
    @comment.post_id = 1
    @comment.save
    post = Post.find(@comment.post_id)
    respond_with(@comments = post.comments.all)
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :no_content }
    end
  end
end
