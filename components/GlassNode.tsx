import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function GlassNode({ data, selected }: NodeProps) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-4 py-2 shadow-lg rounded-full border backdrop-blur-md transition-all duration-300 min-w-[150px] text-center
        ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}
        bg-card/60 text-card-foreground
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3" />

            <div className="font-medium text-sm">
                {data.label as string}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3" />
        </motion.div>
    );
}
