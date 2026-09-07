import { blogData } from "./blogblockData";

const BLOG_STORAGE_KEY =
    "krishna_advance_physio_blogs";


/* =========================================================
   GET BLOGS
========================================================= */

export const getBlogs = () => {

    try {

        const stored =
            localStorage.getItem(
                BLOG_STORAGE_KEY
            );

        /*
         * First time application opens:
         * use your existing static blogs.
         */

        if (stored === null) {
            return blogData;
        }

        return JSON.parse(stored);

    } catch (error) {

        console.error(
            "Unable to load blogs:",
            error
        );

        return blogData;
    }
};


/* =========================================================
   SAVE BLOGS
========================================================= */

export const saveBlogs = (blogs) => {

    localStorage.setItem(
        BLOG_STORAGE_KEY,
        JSON.stringify(blogs)
    );

    /*
     * Tell BlogBlock and BlogDetails
     * that data has changed.
     */

    window.dispatchEvent(
        new CustomEvent(
            "blogDataUpdated"
        )
    );
};


/* =========================================================
   ADD BLOG
========================================================= */

export const addBlog = (blog) => {

    const blogs =
        getBlogs();

    const newBlog = {

        ...blog,

        id:
            `blog-${Date.now()}`,

        createdAt:
            new Date().toISOString()
    };

    saveBlogs([
        newBlog,
        ...blogs
    ]);

    return newBlog;
};


/* =========================================================
   UPDATE BLOG
========================================================= */

export const updateBlog = (
    id,
    updatedBlog
) => {

    const blogs =
        getBlogs();

    const updatedBlogs =
        blogs.map(
            (blog) => {

                if (
                    String(blog.id) ===
                    String(id)
                ) {

                    return {
                        ...blog,
                        ...updatedBlog,
                        id: blog.id
                    };
                }

                return blog;
            }
        );

    saveBlogs(
        updatedBlogs
    );

    return updatedBlogs;
};


/* =========================================================
   DELETE BLOG
========================================================= */

export const deleteBlog = (id) => {

    const blogs =
        getBlogs();

    const updatedBlogs =
        blogs.filter(
            (blog) =>
                String(blog.id) !==
                String(id)
        );

    saveBlogs(
        updatedBlogs
    );

    return updatedBlogs;
};