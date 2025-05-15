import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ handleChangePage }) {
  return (
    <div className={css.LoadMoreBtnWrap}>
      <button className={css.loadMoreBtn} onClick={handleChangePage}>
        Load More
      </button>
    </div>
  );
}
