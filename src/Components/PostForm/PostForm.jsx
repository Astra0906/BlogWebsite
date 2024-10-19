import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
    
    // Loading state
    const [loading, setLoading] = useState(false);

    const submithandler = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            if (post) {
                const file = data.image[0] ? await service.uploadfile(data.image[0]) : null;

                if (file) {
                    console.log("old file" + post.featuredImage);
                    console.log("new file" + file.$id);
                    await service.deleteFile(post.featuredImage);
                    console.log("deleted");
                }
                const dbpost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`);
                }
            } else {
                const file = await service.uploadfile(data.image[0])
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbpost = await service.createPost({ ...data, userId: userData.$id })
                    if (dbpost) {
                        navigate(`/post/${dbpost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error during post submission:", error);
        } finally {
            setLoading(false); // Reset loading state after submission
        }
    }

    const slugTransform = (value) => {
        if (value && typeof value === "string") {
            const str = value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')  // Remove special characters except space and dash
                .replace(/\s+/g, '-')       // Replace spaces with dashes
                .replace(/--+/g, '-');
            return str.length > 30 ? str.substring(0, 30) : str;
        }
        return "";
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })
    }, [setValue, watch, slugTransform])

    return (
        <>
            <form onSubmit={handleSubmit(submithandler)} className='grid md:grid-cols-3 w-full gap-6'>
                <div className='w-full md:col-span-2'>
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-3"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="slug"
                        className="mb-3"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className='w-full md:col-span-1 '>
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
{post && (
    <div className='w-full mb-4'>
        <img src={service.previewFile(post.featuredImage)} alt={post.title} className='rounded-lg' />
    </div>
)}

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type='submit' bgColor={post ? "bg-green-500" : undefined} className='w-full' disabled={loading}>
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.074-4.074A7.962 7.962 0 0012 4a8 8 0 000 16z"></path>
                                </svg>
                                {post?"Updating...":"Uploading..."}
                            </span>
                        ) : (
                            post ? "Update" : "Upload"
                        )}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PostForm;
