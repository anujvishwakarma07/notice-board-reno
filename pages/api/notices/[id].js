import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const noticeId = parseInt(id);

  if (isNaN(noticeId)) {
    return res.status(400).json({ error: 'Invalid notice ID.' });
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and cannot be empty.' });
      }
      if (!body || typeof body !== 'string' || body.trim() === '') {
        return res.status(400).json({ error: 'Body is required and cannot be empty.' });
      }
      if (!category || !['Exam', 'Event', 'General'].includes(category)) {
        return res.status(400).json({ error: 'Category must be one of: Exam, Event, General.' });
      }
      if (!priority || !['Normal', 'Urgent'].includes(priority)) {
        return res.status(400).json({ error: 'Priority must be either Normal or Urgent.' });
      }
      if (!publishDate || isNaN(Date.parse(publishDate))) {
        return res.status(400).json({ error: 'A valid publish date is required.' });
      }

      const existingNotice = await prisma.notice.findUnique({
        where: { id: noticeId }
      });

      if (!existingNotice) {
        return res.status(404).json({ error: 'Notice not found.' });
      }

      const updatedNotice = await prisma.notice.update({
        where: { id: noticeId },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image && image.trim() !== '' ? image.trim() : null
        }
      });

      return res.status(200).json(updatedNotice);
    } catch (error) {
      console.error('Error updating notice:', error);
      return res.status(500).json({ error: 'Failed to update notice.' });
    }
  } 
  
  else if (req.method === 'DELETE') {
    try {
      const existingNotice = await prisma.notice.findUnique({
        where: { id: noticeId }
      });

      if (!existingNotice) {
        return res.status(404).json({ error: 'Notice not found.' });
      }

      await prisma.notice.delete({
        where: { id: noticeId }
      });

      return res.status(200).json({ message: 'Notice deleted successfully.' });
    } catch (error) {
      console.error('Error deleting notice:', error);
      return res.status(500).json({ error: 'Failed to delete notice.' });
    }
  } 
  
  else {
    res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
