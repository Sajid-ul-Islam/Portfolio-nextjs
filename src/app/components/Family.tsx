"use client";
import React from 'react';
import { family } from '../data';
import { FaUserFriends } from 'react-icons/fa';

const Family = () => {
    return (
        <section id="family" className="py-20 bg-dark-lighter">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="border-b-4 border-primary pb-2">Family & Relatives</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {family.map((member, index) => (
                        <div key={index} className="p-6 rounded-xl bg-dark border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <FaUserFriends />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-1">{member.relation}</h3>
                                    <h4 className="text-xl font-bold text-white mb-2">
                                        {member.nameLink ? (
                                            <a
                                                href={member.nameLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-colors"
                                            >
                                                {member.name}
                                            </a>
                                        ) : (
                                            member.name
                                        )}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {member.occupation}
                                    </p>
                                    {member.link && (
                                        <a
                                            href={member.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 text-primary hover:text-white text-sm transition-colors"
                                        >
                                            View Details
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Family;
