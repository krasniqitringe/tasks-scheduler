import { CheckboxIcon, CommentIcon, LinkIcon } from "@/assets/img";

interface TaskItemTypes {
  image?: string;
  title?: string;
  subtitle?: string;
  date?: string;
  multipleTask?: Array<number>;
  attachments?: number;
  comments?: number;
  tags?: Array<string>;
}

export default function TaskItem({
  image,
  title,
  subtitle,
  date,
  multipleTask,
  attachments,
  comments,
  tags,
}: TaskItemTypes) {
  return (
    <div className="task-wrapper">
      <div className="tag-wrapper">
        {tags?.map((item: string) => {
          switch (item) {
            case "Content":
              return <div className="tag yellow">{item}</div>;
            case "Design":
              return <div className="tag purple">{item}</div>;
            case "Research":
              return <div className="tag blue">{item}</div>;
            case "Planning":
              return <div className="tag orange">{item}</div>;

            default:
              break;
          }
        })}
      </div>

      {image && <img src={image} alt="task image" />}

      {title && <h4>{title}</h4>}
      {subtitle && <p>{subtitle}</p>}
      {date && <p className="date">{date}</p>}

      <div className="task-footer">
        <div className="participants-wrapper">
          <img src="/src/assets/img/participant-1.jpg" alt="task participant" />
          <img src="/src/assets/img/participant-2.jpg" alt="task participant" />
          <img src="/src/assets/img/participant-3.jpg" alt="task participant" />
        </div>

        {multipleTask && (
          <div className="multiple-task">
            <CheckboxIcon />
            <span>
              {multipleTask[0]}/{multipleTask[1]}
            </span>
          </div>
        )}

        {attachments && (
          <div className="attachment-wrapper">
            <LinkIcon />
            <span>{attachments == 1 ? "1 file" : `${attachments} files`}</span>
          </div>
        )}

        {comments && (
          <div className="comment-wrapper">
            <CommentIcon />
            <span>{comments == 1 ? "1 Comment" : `${comments} Comments`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
