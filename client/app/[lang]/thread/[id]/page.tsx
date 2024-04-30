'use client';
import ThreadDetail from '../components/ThreadDetail';

export default function Thread({ params }: { params: { id: string } }) {
    
    return (
        <div className="md-limited-width-layout__content">
            <div className="grid gap-8 py-8">
                <ThreadDetail id={params.id} />
            </div>
        </div>
    )
}