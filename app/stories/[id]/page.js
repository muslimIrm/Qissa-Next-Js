"use client";

import { TfiBackRight } from "react-icons/tfi";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Modal, Typography, TextField, Button, Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import URL from "../../URL";
import ErrorLoading from "@/app/  components/Basic_Components/ErrorLoading";
import Loading from "@/app/  components/Basic_Components/Loading";
import Header from "@/app/  components/Basic_Components/stories/Header";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { RSCPathnameNormalizer } from "next/dist/server/normalizers/request/rsc";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'var(--background)',
  border: '2px solid var(--primary-color)',
  borderRadius: '10px',
  boxShadow: 24,
  padding: "30px 20px",
  fontFamily: "var(--font-cairo)",
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  gap: "1rem",
  width: "90%",             // مخصص للشاشات الصغيرة
  maxWidth: "600px",        // أقصى عرض
  maxHeight: "90vh",        // أقصى ارتفاع للـ Modal
  overflowY: "auto",        // السماح بالتمرير عند زيادة المحتوى
};

const Story = () => {
  // ✅ Consolidate auth state
  const [auth, setAuth] = useState({
    token: null,
    userId: null
  });

  // ✅ Single story state object
  const [storyState, setStoryState] = useState({
    data: null,
    loading: true,
    error: false,
    reload: false
  });

  // ✅ UI state management
  const [uiState, setUiState] = useState({
    showOptions: false,
    deleteModal: false,
    editModal: false,
    isLoading: false
  });

  // ✅ Edit form state - منفصل للتعديلات المؤقتة
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    source: '',
    image: ''
  });

  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState({ fullname: "جار التحميل...", username: "" });
  const [state, setState] = useState(true)

  // ✅ Initialize auth once
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    setAuth({ token, userId });
  }, []);

  // ✅ Fetch story data
  const fetchStory = useCallback(async () => {
    setStoryState(prev => ({ ...prev, loading: true, error: false }));

    try {
      const response = await axios.get(`${URL}api/stories/${id}`);
      const storyData = response.data.story;

      setStoryState(prev => ({
        ...prev,
        data: storyData,
        loading: false
      }));

      console.log(storyData)
      if (storyData.state === "pending" || storyData.state === "rejected") {
        setState(false)
      }
    } catch (error) {
      console.error("Error fetching story:", error);
      setStoryState(prev => ({
        ...prev,
        error: true,
        loading: false
      }));
      toast.error("حدث خطأ في تحميل القصة");
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchStory();
  }, [fetchStory, storyState.reload]);

  const { data: story } = storyState;
  useEffect(() => {
  if(story) {
    if(story.user) {
      setUser(story.user);
    } else {
      setUser({ fullname: "الحساب محذوف", username: "username" });
    }
  }
}, [story]);
  // ✅ Memoized computed values
  const formattedDate = useMemo(() => {
    if (!storyState.data?.createdAt) return '';
    return new Date(storyState.data.createdAt).toLocaleDateString("ar-EG");
  }, [storyState.data?.createdAt]);

  const isOwner = useMemo(() => {
    return storyState.data?.user?._id === auth.userId;
  }, [storyState.data?.user?._id, auth.userId]);

  // ✅ UI handlers
  const toggleOptions = () => {
    setUiState(prev => ({ ...prev, showOptions: !prev.showOptions }));
  };

  const openDeleteModal = () => {
    setUiState(prev => ({
      ...prev,
      deleteModal: true,
      showOptions: false
    }));
  };

  const openEditModal = () => {
    // ✅ Initialize edit form with current data
    if (storyState.data) {
      setEditForm({
        title: storyState.data.title || '',
        content: storyState.data.content || '',
        source: storyState.data.surce || '', // Note: typo in original API
        image: storyState.data.image || ''
      });
    }
    setUiState(prev => ({
      ...prev,
      editModal: true,
      showOptions: false
    }));
  };

  const closeModals = () => {
    setUiState(prev => ({
      ...prev,
      deleteModal: false,
      editModal: false,
      showOptions: false
    }));
    // Reset edit form
    setEditForm({ title: '', content: '', source: '', image: '' });
  };

  // ✅ Update edit form
  const updateEditForm = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // ✅ Save edited story
  const saveStoryEdit = async () => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      toast.error("العنوان والمحتوى مطلوبان");
      return;
    }

    setUiState(prev => ({ ...prev, isLoading: true }));

    try {

      const updateData = new FormData();
      updateData.append("title", editForm.title.trim());
      updateData.append("content", editForm.content.trim());
      updateData.append("surce", editForm.source.trim());
      if (editForm.image) {
        updateData.append("image", editForm.image);
      }

      await axios.put(`${URL}api/stories/${id}`, updateData, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      toast.success("تم التحديث بنجاح");
      closeModals();

      // ✅ Reload story data
      setStoryState(prev => ({ ...prev, reload: !prev.reload }));

    } catch (error) {
      console.error("Edit error:", error);
      toast.error("حدث خطأ في التحديث");
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // ✅ Delete story
  const deleteStory = async () => {
    setUiState(prev => ({ ...prev, isLoading: true }));

    try {
      await axios.delete(`${URL}api/stories/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      toast.success("تم الحذف بنجاح");
      closeModals();

      setTimeout(() => router.push("/stories"), 1000);

    } catch (error) {
      console.error("Delete error:", error);
      toast.error("حدث خطأ في الحذف");
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // ✅ Retry handler
  const handleRetry = () => {
    setStoryState(prev => ({ ...prev, reload: !prev.reload, error: false }));
  };

  if (storyState.loading) return <Loading />;
  if (storyState.error) return <ErrorLoading onClick={handleRetry} />;
  if (!storyState.data) return null;


  return (
    <>
      <Header path="/stories" />

      <div className="!pt-[90px] !pb-16 flex items-center justify-center w-full">
        <div className="container max-w-5xl mx-auto !px-4 !flex items-center !justify-center">
          {(state || (!state && isOwner)) ?
            <div className="bg-[var(--second-color)] rounded-2xl shadow-lg !p-6 !space-y-8 !w-full">

              {/* User Info Header */}
              <div className="border-b flex flex-col !pb-4 relative">
                <div className="flex items-center !pb-2 gap-2">
                  <img
                    className="!rounded-full !w-[50px] !h-[50px]"
                    src={
                      user.account_icon === "defultImage" || !user.account_icon
                        ? "/prfilo-Icon.png"
                        : user.account_icon
                    }
                    alt="User avatar"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold">{user.fullname}</h3>
                    <span className="!text-sm">@{user.username}</span>
                  </div>
                </div>

                <div className="flex items-center !pr-2">
                  <span className="text-gray-500">تاريخ النشر: {formattedDate}</span>
                </div>

                {/* Options Menu - Only for owner */}
                {isOwner && (
                  <div className="absolute left-0">
                    <BsThreeDotsVertical
                      onClick={toggleOptions}
                      className="cursor-pointer"
                    />
                    {uiState.showOptions && (
                      <div className="flex flex-col absolute !p-1 top-6 left-0 bg-[var(--background)] gap-2 rounded-md shadow-lg z-10">
                        <span
                          className="w-full text-center hover:bg-gray-500/10 !px-2 !py-1 cursor-pointer whitespace-nowrap"
                          onClick={openEditModal}
                        >
                          تعديل
                        </span>
                        <span
                          className="w-full text-center hover:bg-gray-500/10 !px-2 !py-1 cursor-pointer whitespace-nowrap"
                          onClick={openDeleteModal}
                        >
                          حذف
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Story Title */}
              <h1 className="!text-3xl font-bold">{story.title}</h1>

              {/* Story Content */}
              <div className="relative">
                <p className="!text-base !leading-loose text-justify !p-2 !pt-0 !w-full !h-full">
                  {story.image && (
                    <img
                      src={story.image}
                      alt="صورة القصة"
                      className="float-left w-[200px] h-auto !mr-6 !mb-4 rounded-xl shadow"
                    />
                  )}
                  {story.content}
                  <span className="float-end !m-3 text-[var(--primary-color)]">
                    المصدر: {story.surce}
                  </span>
                </p>
              </div>
            </div>
            : <div className="!flex items-center justify-center !w-full">هذه قصة خاصة لا يمكنك قراءتها.</div>
          }
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={uiState.deleteModal}
        onClose={closeModals}
        aria-labelledby="delete-modal-title"
      >
        <Box style={modalStyle} className="flex-col">
          <Typography variant="h6" component="h2" className="!text-right !mb-4">
            حذف القصة
          </Typography>
          <Typography variant="body1" className="!text-right !mb-6">
            هل أنت متأكد من حذف القصة؟ لا يمكن التراجع عن هذا الإجراء.
          </Typography>
          <div className="flex w-full gap-2">
            <Button
              onClick={deleteStory}
              disabled={uiState.isLoading}
              className="btn md:!py-2 md:!px-3 !py-2 !px-3 max-lg:!text-[16px] !text-sm !rounded-lg"
            >
              {uiState.isLoading ? "جار الحذف..." : "نعم"}
            </Button>
            <Button
              onClick={closeModals}
              disabled={uiState.isLoading}
              className="btn-out md:!py-2 md:!px-3 !py-2 !px-3 max-lg:!text-[16px] !text-sm !rounded-lg"
            >
              لا
            </Button>
          </div>
        </Box>
      </Modal>

      {/* ✅ Edit Story Modal - الجديد */}
      <Modal
        open={uiState.editModal}
        onClose={closeModals}
        aria-labelledby="edit-modal-title"
      >
        <Box style={{ ...modalStyle, width: '800px' }} className="flex-col">
          <Typography variant="h6" component="h2" className="!text-right mb-6">
            تعديل القصة
          </Typography>

          <div className="!space-y-4">
            {/* Title Field */}
            <TextField
              label="عنوان القصة"
              value={editForm.title}
              onChange={(e) => updateEditForm('title', e.target.value)}
              fullWidth
              variant="outlined"
              className="!text-right"
              InputProps={{ className: "!text-right" }}
              InputLabelProps={{ className: "!text-right" }}
            />

            {/* Content Field */}
            <TextField
              label="محتوى القصة"
              value={editForm.content}
              onChange={(e) => updateEditForm('content', e.target.value)}
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              className="!text-right"
              InputProps={{ className: "!text-right" }}
              InputLabelProps={{ className: "!text-right" }}
            />

            {/* Source Field */}
            <TextField
              label="المصدر"
              value={editForm.source}
              onChange={(e) => updateEditForm('source', e.target.value)}
              fullWidth
              variant="outlined"
              className="!text-right"
              InputProps={{ className: "!text-right" }}
              InputLabelProps={{ className: "!text-right" }}
            />

            {/* Image URL Field */}
            <TextField
              label="رابط الصورة"
              onChange={(e) => updateEditForm('image', e.target.files[0])}
              fullWidth
              type="file"
              variant="outlined"
              className="!text-right"
              InputProps={{ className: "!text-right" }}
              InputLabelProps={{ className: "!text-right" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-2 !mt-6 justify-end">
            <Button
              onClick={saveStoryEdit}
              disabled={uiState.isLoading}
              className="btn md:!py-2 md:!px-4 !py-2 !px-4 !text-sm !rounded-lg"
            >
              {uiState.isLoading ? "جار الحفظ..." : "حفظ التعديلات"}
            </Button>
            <Button
              onClick={closeModals}
              disabled={uiState.isLoading}
              className="btn-out md:!py-2 md:!px-4 !py-2 !px-4 !text-sm !rounded-lg"
            >
              إلغاء
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Story;