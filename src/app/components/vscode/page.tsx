import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { LuCalendar, LuChevronLeft, LuFileText, LuTag } from "react-icons/lu";

const BLOGS_DIR = path.join(process.cwd(), "src/content/blogs");

// 1. Generate static paths at build time for high performance
export async function generateStaticParams() {
    if (!fs.existsSync(BLOGS_DIR)) return [];
    const files = fs.readdirSync(BLOGS_DIR);
    return files.map((file) => ({
        id: file.replace(/\.mdx?$/, ""),
    }));
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const filePath = path.join(BLOGS_DIR, `${id}.mdx`);

    // Return a 404 if the MDX file doesn't exist
    if (!fs.existsSync(filePath)) {
        notFound();
    }

    // 2. Read file and parse frontmatter
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    // 3. Configure syntax highlighting (VS Code Dark theme)
    const rehypePrettyCodeOptions = {
        theme: "github-dark", // You can also use 'one-dark-pro' or 'dracula'
        keepBackground: false, // Allows custom CSS backgrounds
    };

    return (
        <div className="max-w-4xl mx-auto p-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link href="/Blogs" className="flex items-center gap-2 text-[#a3e635]/60 hover:text-[#a3e635] text-xs mb-8 transition-colors">
                <LuChevronLeft size={14} />
                BACK_TO_ARCHIVE
            </Link>

            <div className="mb-10 relative">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#a3e635]"></div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 glow-text leading-tight">
                    {frontmatter.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <LuCalendar size={12} className="text-[#a3e635]" />
                        <span>DATA_ENTRY: {frontmatter.date || "UNKNOWN"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LuFileText size={12} className="text-[#a3e635]" />
                        <span>TYPE: INTEL_DOSSIER</span>
                    </div>
                    {frontmatter.tags && (
                        <div className="flex items-center gap-2">
                            <LuTag size={12} className="text-[#a3e635]" />
                            <span>TAGS: {frontmatter.tags.join("_").toUpperCase()}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 bg-[#0a1a15]/40 backdrop-blur-sm border border-[#a3e635]/10 rounded-lg space-y-8 text-gray-300 leading-relaxed text-sm">
                {/* 4. Render the MDX Content */}
                <article className="prose prose-invert prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-p:leading-relaxed prose-a:text-[#a3e635] max-w-none">
                    <MDXRemote
                        source={content}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions] as any],
                            },
                        }}
                    />
                </article>

                <section className="pt-10 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">SIGNAL_ARCHIVE_END // SAJID_ISLAM</p>
                    <Link
                        href="/Blogs"
                        className="px-8 py-3 bg-[#166534] text-white font-black text-xs uppercase tracking-widest hover:bg-[#a3e635] hover:text-black transition-all"
                    >
                        Return_To_Intel_Stream
                    </Link>
                </section>
            </div>
        </div>
    );
}