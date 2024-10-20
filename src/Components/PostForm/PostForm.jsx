import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from "..";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import service from '../../appwrite/Service';

const PostForm = ({ post }) => {
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')  // Remove special characters
                .replace(/\s+/g, '-')       // Replace spaces with dashes
                .replace(/--+/g, '-')       // Replace multiple dashes with one
                .substring(0, 30);          // Limit length to 30
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }, [watch, setValue, slugTransform]);

    const submithandler = async (data) => {
        setLoading(true);
        try {
            const file = data.image?.[0] ? await service.uploadfile(data.image[0]) : null;

            if (post) {
                if (file) {
                    await service.deleteFile(post.featuredImage);
                }
                const updatedPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file?.$id,
                });
                if (updatedPost) navigate(`/post/${updatedPost.$id}`);
            } else {
                if (!file) throw new Error("Image is required for new posts.");
                const newPost = await service.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });
                if (newPost) navigate(`/post/${newPost.$id}`);
            }
        } catch (error) {
            console.error("Error during post submission:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submithandler)} className="grid md:grid-cols-3 w-full gap-6">
            <div className="w-full md:col-span-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-3"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-3"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-full md:col-span-1">
                <Input
                    type="file"
                    className="mb-4"
                    label="Featured image :"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {!post && (
                    <p className="text-red-500 text-sm mb-4">
                        * Uploading an image is mandatory for new posts.
                    </p>
                )}
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.previewFile(post.featuredImage)}
                            alt={post.title || "Featured"}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 0114.074-4.074A7.962 7.962 0 0012 4a8 8 0 000 16z"
                                />
                            </svg>
                            {post ? "Updating..." : "Uploading..."}
                        </span>
                    ) : post ? "Update" : "Upload"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
