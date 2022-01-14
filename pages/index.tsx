import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import toast from 'react-hot-toast';
import AddPostModal from '../components/AddPostModal';
import CalendarEvent from '../components/CalendarEvent';
import UpdatePostModal from '../components/UpdatePostModal';
import { localizer } from '../lib/util';
import { prisma } from './../db';

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      provider: true,
      campaigns: true
    }
  });
  const providers = await prisma.provider.findMany();
  const campaigns = await prisma.campaign.findMany();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      providers: JSON.parse(JSON.stringify(providers)),
      campaigns: JSON.parse(JSON.stringify(campaigns))
    }
  };
};

const Index = ({ posts, providers, campaigns }) => {
  const [events, setEvents] = useState(
    posts.map((p) => ({
      ...p,
      start: p.publishAt,
      end: p.publishAt
    }))
  );

  const [newPost, setNewPost] = useState(null);
  const [postToUpdate, setPostToUpdate] = useState(null);

  return (
    <div>
      <Head>
        <title>Schedule | SocialCue</title>
      </Head>
      <div className="p-8 -m-8 overflow-scroll">
        <Calendar
          className="shadow-lg p-4 rounded-xl bg-gradient-to-br from-purple-50 via-white to-purple-50 min-w-max"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: '1000px', minWidth: '800px' }}
          components={{
            event: CalendarEvent
          }}
          selectable
          onSelectSlot={(slot) => setNewPost(slot.start)}
          onDrillDown={(date) => setNewPost(date)}
          onSelectEvent={(event) => setPostToUpdate(event)}
          views={['month']}
        />
      </div>

      <AddPostModal
        isOpen={!!newPost}
        date={new Date(newPost)}
        onClose={() => setNewPost(null)}
        onAddPostSuccess={(result) => {
          toast.success(result.message);
          setEvents([
            ...events,
            {
              ...result.data,
              start: result.data.publishAt,
              end: result.data.publishAt
            }
          ]);
          setNewPost(null);
        }}
        onAddPostError={(err) => toast.error(err)}
        providers={providers}
        campaigns={campaigns}
      />

      <UpdatePostModal
        onClose={() => setPostToUpdate(null)}
        onUpdatePostSuccess={(result) => {
          toast.success(result.message);
          setEvents(
            events.map((event) => {
              if (event.id === result.data.id) {
                return {
                  ...result.data,
                  start: result.data.publishAt,
                  end: result.data.publishAt
                };
              }
              return event;
            })
          );

          setPostToUpdate(null);
        }}
        onUpdatePostError={(err) => toast.error(err)}
        onDeletePostSuccess={(result) => {
          toast.success(result.message);
          setEvents(events.filter((event) => event.id !== postToUpdate.id));
          setPostToUpdate(null);
        }}
        onDeletePostError={(err) => toast.error(err)}
        providers={providers}
        campaigns={campaigns}
        post={postToUpdate}
      />
    </div>
  );
};

export default Index;
