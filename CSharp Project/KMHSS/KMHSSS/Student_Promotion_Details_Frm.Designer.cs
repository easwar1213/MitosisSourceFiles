namespace KMHSSS
{
    partial class Student_Promotion_Details_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Student_Promotion_Details_Master_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Promote_Btn = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.groupBox6 = new System.Windows.Forms.GroupBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.CEYear_Txt = new System.Windows.Forms.TextBox();
            this.CPromote_Btn = new System.Windows.Forms.Button();
            this.CSYear_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.label13 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.Student_Name_CBox = new System.Windows.Forms.ComboBox();
            this.Admis_No_Txt = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.groupBox5 = new System.Windows.Forms.GroupBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.Backup_Btn = new System.Windows.Forms.Button();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.label1 = new System.Windows.Forms.Label();
            this.Refresh_Btn = new System.Windows.Forms.Button();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Student_Promotion_Details_Master_dataGridView1)).BeginInit();
            this.groupBox1.SuspendLayout();
            this.groupBox6.SuspendLayout();
            this.groupBox5.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Student_Promotion_Details_Master_dataGridView1);
            this.groupBox3.ForeColor = System.Drawing.Color.Black;
            this.groupBox3.Location = new System.Drawing.Point(29, 205);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(878, 402);
            this.groupBox3.TabIndex = 1;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Student_Promotion_Details_Master_dataGridView1
            // 
            this.Student_Promotion_Details_Master_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Student_Promotion_Details_Master_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Student_Promotion_Details_Master_dataGridView1.Location = new System.Drawing.Point(27, 34);
            this.Student_Promotion_Details_Master_dataGridView1.Name = "Student_Promotion_Details_Master_dataGridView1";
            this.Student_Promotion_Details_Master_dataGridView1.Size = new System.Drawing.Size(823, 343);
            this.Student_Promotion_Details_Master_dataGridView1.TabIndex = 0;
            this.Student_Promotion_Details_Master_dataGridView1.VirtualMode = true;
            this.Student_Promotion_Details_Master_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Student_Promotion_Details_Master_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // Promote_Btn
            // 
            this.Promote_Btn.ForeColor = System.Drawing.Color.Black;
            this.Promote_Btn.Location = new System.Drawing.Point(18, 33);
            this.Promote_Btn.Name = "Promote_Btn";
            this.Promote_Btn.Size = new System.Drawing.Size(115, 69);
            this.Promote_Btn.TabIndex = 11;
            this.Promote_Btn.Text = "Promote";
            this.Promote_Btn.UseVisualStyleBackColor = true;
            this.Promote_Btn.Click += new System.EventHandler(this.Promote_Btn_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox6);
            this.groupBox1.Controls.Add(this.groupBox5);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.ForeColor = System.Drawing.Color.Black;
            this.groupBox1.Location = new System.Drawing.Point(28, 48);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1309, 644);
            this.groupBox1.TabIndex = 16;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Student Promotion Details";
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.ForeColor = System.Drawing.Color.Black;
            this.Close_Btn.Location = new System.Drawing.Point(23, 33);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(115, 69);
            this.Close_Btn.TabIndex = 13;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // groupBox6
            // 
            this.groupBox6.Controls.Add(this.View_Btn);
            this.groupBox6.Controls.Add(this.CEYear_Txt);
            this.groupBox6.Controls.Add(this.CPromote_Btn);
            this.groupBox6.Controls.Add(this.CSYear_CBox);
            this.groupBox6.Controls.Add(this.Class_CBox);
            this.groupBox6.Controls.Add(this.label13);
            this.groupBox6.Controls.Add(this.label5);
            this.groupBox6.Controls.Add(this.Sec_CBox);
            this.groupBox6.Controls.Add(this.label3);
            this.groupBox6.Controls.Add(this.Student_Name_CBox);
            this.groupBox6.Controls.Add(this.Admis_No_Txt);
            this.groupBox6.Controls.Add(this.label10);
            this.groupBox6.Controls.Add(this.label14);
            this.groupBox6.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox6.Location = new System.Drawing.Point(29, 38);
            this.groupBox6.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox6.Name = "groupBox6";
            this.groupBox6.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox6.Size = new System.Drawing.Size(878, 155);
            this.groupBox6.TabIndex = 63;
            this.groupBox6.TabStop = false;
            this.groupBox6.Text = "Condtional Promotion";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(632, 80);
            this.View_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(95, 57);
            this.View_Btn.TabIndex = 233;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            this.View_Btn.KeyDown += new System.Windows.Forms.KeyEventHandler(this.View_Btn_KeyDown);
            // 
            // CEYear_Txt
            // 
            this.CEYear_Txt.Enabled = false;
            this.CEYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.CEYear_Txt.Location = new System.Drawing.Point(221, 32);
            this.CEYear_Txt.Name = "CEYear_Txt";
            this.CEYear_Txt.Size = new System.Drawing.Size(97, 28);
            this.CEYear_Txt.TabIndex = 2;
            // 
            // CPromote_Btn
            // 
            this.CPromote_Btn.Location = new System.Drawing.Point(755, 80);
            this.CPromote_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.CPromote_Btn.Name = "CPromote_Btn";
            this.CPromote_Btn.Size = new System.Drawing.Size(95, 57);
            this.CPromote_Btn.TabIndex = 7;
            this.CPromote_Btn.Text = "Promote";
            this.CPromote_Btn.UseVisualStyleBackColor = true;
            this.CPromote_Btn.Click += new System.EventHandler(this.CPromote_Btn_Click);
            // 
            // CSYear_CBox
            // 
            this.CSYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.CSYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.CSYear_CBox.FormattingEnabled = true;
            this.CSYear_CBox.Location = new System.Drawing.Point(120, 31);
            this.CSYear_CBox.Name = "CSYear_CBox";
            this.CSYear_CBox.Size = new System.Drawing.Size(95, 29);
            this.CSYear_CBox.TabIndex = 0;
            this.CSYear_CBox.SelectedIndexChanged += new System.EventHandler(this.CSYear_CBox_SelectedIndexChanged);
            this.CSYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.CSYear_CBox_KeyDown);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(450, 31);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(161, 29);
            this.Class_CBox.TabIndex = 3;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(351, 34);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 213;
            this.label13.Text = "Class";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(21, 34);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(54, 21);
            this.label5.TabIndex = 232;
            this.label5.Text = "AYear";
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(700, 31);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(156, 29);
            this.Sec_CBox.TabIndex = 4;
            this.Sec_CBox.SelectedIndexChanged += new System.EventHandler(this.Sec_CBox_SelectedIndexChanged);
            this.Sec_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Sec_CBox_KeyDown);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(628, 32);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(63, 21);
            this.label3.TabIndex = 220;
            this.label3.Text = "Section";
            // 
            // Student_Name_CBox
            // 
            this.Student_Name_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Student_Name_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Student_Name_CBox.FormattingEnabled = true;
            this.Student_Name_CBox.Location = new System.Drawing.Point(120, 95);
            this.Student_Name_CBox.Name = "Student_Name_CBox";
            this.Student_Name_CBox.Size = new System.Drawing.Size(198, 29);
            this.Student_Name_CBox.TabIndex = 5;
            this.Student_Name_CBox.SelectedIndexChanged += new System.EventHandler(this.Student_Name_CBox_SelectedIndexChanged);
            this.Student_Name_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Student_Name_CBox_KeyDown);
            // 
            // Admis_No_Txt
            // 
            this.Admis_No_Txt.Enabled = false;
            this.Admis_No_Txt.Location = new System.Drawing.Point(450, 96);
            this.Admis_No_Txt.Margin = new System.Windows.Forms.Padding(4);
            this.Admis_No_Txt.Name = "Admis_No_Txt";
            this.Admis_No_Txt.Size = new System.Drawing.Size(161, 28);
            this.Admis_No_Txt.TabIndex = 6;
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(348, 99);
            this.label10.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(80, 21);
            this.label10.TabIndex = 216;
            this.label10.Text = "Admis No";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(21, 102);
            this.label14.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(83, 21);
            this.label14.TabIndex = 214;
            this.label14.Text = "Std Name";
            // 
            // groupBox5
            // 
            this.groupBox5.Controls.Add(this.EYear_Txt);
            this.groupBox5.Controls.Add(this.label2);
            this.groupBox5.Controls.Add(this.SYear_CBox);
            this.groupBox5.Controls.Add(this.label6);
            this.groupBox5.Controls.Add(this.Backup_Btn);
            this.groupBox5.Location = new System.Drawing.Point(914, 39);
            this.groupBox5.Name = "groupBox5";
            this.groupBox5.Size = new System.Drawing.Size(356, 152);
            this.groupBox5.TabIndex = 18;
            this.groupBox5.TabStop = false;
            this.groupBox5.Text = "Backup";
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(78, 87);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(129, 28);
            this.EYear_Txt.TabIndex = 63;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(19, 94);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(52, 21);
            this.label2.TabIndex = 62;
            this.label2.Text = "EYear";
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(78, 37);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(129, 29);
            this.SYear_CBox.TabIndex = 8;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(18, 40);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(53, 21);
            this.label6.TabIndex = 61;
            this.label6.Text = "SYear";
            // 
            // Backup_Btn
            // 
            this.Backup_Btn.Location = new System.Drawing.Point(228, 40);
            this.Backup_Btn.Name = "Backup_Btn";
            this.Backup_Btn.Size = new System.Drawing.Size(99, 70);
            this.Backup_Btn.TabIndex = 10;
            this.Backup_Btn.Text = "Backup";
            this.Backup_Btn.UseVisualStyleBackColor = true;
            this.Backup_Btn.Click += new System.EventHandler(this.Backup_Btn_Click);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Refresh_Btn);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.ForeColor = System.Drawing.Color.Black;
            this.groupBox2.Location = new System.Drawing.Point(1119, 330);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(151, 127);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Refresh";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Promote_Btn);
            this.groupBox4.ForeColor = System.Drawing.Color.Black;
            this.groupBox4.Location = new System.Drawing.Point(936, 330);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(151, 127);
            this.groupBox4.TabIndex = 3;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Promote";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.Black;
            this.label1.Location = new System.Drawing.Point(564, 13);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(253, 27);
            this.label1.TabIndex = 17;
            this.label1.Text = "Student Promotion Details";
            // 
            // Refresh_Btn
            // 
            this.Refresh_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Refresh_Btn.ForeColor = System.Drawing.Color.Black;
            this.Refresh_Btn.Location = new System.Drawing.Point(23, 33);
            this.Refresh_Btn.Name = "Refresh_Btn";
            this.Refresh_Btn.Size = new System.Drawing.Size(115, 69);
            this.Refresh_Btn.TabIndex = 14;
            this.Refresh_Btn.Text = "Refresh";
            this.Refresh_Btn.UseVisualStyleBackColor = true;
            this.Refresh_Btn.Click += new System.EventHandler(this.Refresh_Btn_Click);
            // 
            // Student_Promotion_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label1);
            this.Name = "Student_Promotion_Details_Frm";
            this.Text = "Student Promotion Details";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Student_Promotion_Details_Frm_Load);
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Student_Promotion_Details_Master_dataGridView1)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox6.ResumeLayout(false);
            this.groupBox6.PerformLayout();
            this.groupBox5.ResumeLayout(false);
            this.groupBox5.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox4.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Student_Promotion_Details_Master_dataGridView1;
        private System.Windows.Forms.Button Promote_Btn;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.GroupBox groupBox5;
        private System.Windows.Forms.Button Backup_Btn;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.GroupBox groupBox6;
        private System.Windows.Forms.Button CPromote_Btn;
        private System.Windows.Forms.ComboBox CSYear_CBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox Student_Name_CBox;
        private System.Windows.Forms.TextBox Admis_No_Txt;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.TextBox CEYear_Txt;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Button Refresh_Btn;
    }
}