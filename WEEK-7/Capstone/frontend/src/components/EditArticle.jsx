import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axiosClient";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!article) return;
    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  const updateArticle = async (modifiedArticle) => {
    modifiedArticle.articleId = article._id;
    const res = await api.put("/author-api/articles", modifiedArticle);
    if (res.status === 200) {
      navigate(`/article/${article._id}`, { state: res.data.payload });
    }
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        <div className={formGroup}>
          <label className={labelClass}>Title</label>
          <input className={inputClass} {...register("title", { required: "Title required" })} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className={formGroup}>
          <label className={labelClass}>Category</label>
          <select className={inputClass} {...register("category", { required: "Category required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        <div className={formGroup}>
          <label className={labelClass}>Content</label>
          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />
          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button className={submitBtn}>Update Article</button>
      </form>
    </div>
  );
}

export default EditArticle;
