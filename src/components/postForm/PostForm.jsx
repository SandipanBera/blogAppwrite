import  { useCallback ,useEffect} from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import uploadFile from "../../appwrite/uploadFile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm( {post} ) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, control, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data?.image[0]
        ? await uploadFile.uploadfile(data.image[0])
        : null;
      if (file) {
        await uploadFile.deleteFile(post.image);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data?.image[0]
        ? await uploadFile.uploadfile(data.image[0])
        : null;
      //Condition check for if any file provided by user or not. If it is then we check the file is empty or not .If then we can upload the image file using appWrite service and store the response value in a variable for further ref.
      if (file) {
        const dbPost = await service.createPost({
          ...data,
          userid: userData.$id,
          image: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_");
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Enter your title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
        />
        <RTE
          name="content"
          label="Editor"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Image"
          type="file"
          accept="image/png, image/jpeg,image/gif,image/jpg"
          className="mb-4"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={uploadFile.getFilePreview(post.image)}
              alt={post.title}
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
          bgColor={post ? "bg-green-600" : undefined}
          className="w-full"
          children={post ? "update" : "submit"}
        />
      </div>
    </form>
  );
}

export default PostForm;
