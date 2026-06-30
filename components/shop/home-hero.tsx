'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  heroTextReveal,
  staggerContainer,
  staggerItem,
  transitionSmooth,
  buttonTap,
} from '@/lib/animations';

interface HomeHeroProps {
  isEmpty: boolean;
}

export function HomeHero({ isEmpty }: HomeHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-slate-900 px-4 text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        {isEmpty ? (
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.h1
              variants={heroTextReveal}
              transition={transitionSmooth}
              className="font-serif text-4xl font-bold tracking-tight md:text-6xl"
            >
              {siteConfig.name}
            </motion.h1>
            <motion.p
              variants={heroTextReveal}
              transition={{ ...transitionSmooth, delay: 0.1 }}
              className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              {siteConfig.tagline}
            </motion.p>
            <motion.p
              variants={heroTextReveal}
              transition={{ ...transitionSmooth, delay: 0.2 }}
              className="mx-auto mt-3 max-w-lg text-sm text-slate-400"
            >
              {siteConfig.description}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.p
              variants={heroTextReveal}
              transition={transitionSmooth}
              className="text-xs font-semibold uppercase tracking-wider text-gold"
            >
              Premium Collection
            </motion.p>
            <motion.h1
              variants={heroTextReveal}
              transition={{ ...transitionSmooth, delay: 0.1 }}
              className="mt-2 font-serif text-4xl font-bold tracking-tight md:text-6xl"
            >
              Timeless <span className="text-gold">Elegance</span> on Your Wrist
            </motion.h1>
            <motion.p
              variants={heroTextReveal}
              transition={{ ...transitionSmooth, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              {siteConfig.description}
            </motion.p>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.div whileTap={buttonTap} whileHover={{ scale: 1.03 }}>
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-gold text-gold-foreground hover:bg-gold/90 h-12 px-8'
              )}
            >
              Shop Now
            </Link>
          </motion.div>
          <motion.div whileTap={buttonTap} whileHover={{ scale: 1.03 }}>
            <Link
              href="/categories"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-12 border-slate-600 bg-transparent px-8 text-slate-200 hover:bg-slate-800 hover:text-white'
              )}
            >
              Browse Categories
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
