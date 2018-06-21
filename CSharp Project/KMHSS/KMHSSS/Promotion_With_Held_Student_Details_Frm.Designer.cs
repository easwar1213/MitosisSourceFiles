namespace KMHSSS
{
    partial class Promotion_With_Held_Student_Details_Frm
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
            this.VMonth_CBox = new System.Windows.Forms.ComboBox();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox5 = new System.Windows.Forms.GroupBox();
            this.Stationary_RBtn = new System.Windows.Forms.RadioButton();
            this.HMonth_CBox = new System.Windows.Forms.ComboBox();
            this.Terms_CBox = new System.Windows.Forms.ComboBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.Print_Btn = new System.Windows.Forms.Button();
            this.Van_Bill_RBtn = new System.Windows.Forms.RadioButton();
            this.Hostel_Bill_RBtn = new System.Windows.Forms.RadioButton();
            this.School_Bill_RBtn = new System.Windows.Forms.RadioButton();
            this.View_Btn = new System.Windows.Forms.Button();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.Fees_Pending_Student_Details_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox5.SuspendLayout();
            this.panel1.SuspendLayout();
            this.groupBox4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Fees_Pending_Student_Details_dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // VMonth_CBox
            // 
            this.VMonth_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.VMonth_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.VMonth_CBox.FormattingEnabled = true;
            this.VMonth_CBox.Items.AddRange(new object[] {
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY"});
            this.VMonth_CBox.Location = new System.Drawing.Point(761, 37);
            this.VMonth_CBox.Name = "VMonth_CBox";
            this.VMonth_CBox.Size = new System.Drawing.Size(103, 29);
            this.VMonth_CBox.TabIndex = 190;
            this.VMonth_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.VMonth_CBox_KeyDown);
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(520, 19);
            this.label9.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(356, 27);
            this.label9.TabIndex = 37;
            this.label9.Text = "Promotion With Held Student Details";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox5);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(29, 51);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.groupBox1.Size = new System.Drawing.Size(1309, 634);
            this.groupBox1.TabIndex = 36;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Promotion With Held Student Details";
            // 
            // groupBox5
            // 
            this.groupBox5.Controls.Add(this.EYear_Txt);
            this.groupBox5.Controls.Add(this.Stationary_RBtn);
            this.groupBox5.Controls.Add(this.SYear_CBox);
            this.groupBox5.Controls.Add(this.VMonth_CBox);
            this.groupBox5.Controls.Add(this.label2);
            this.groupBox5.Controls.Add(this.HMonth_CBox);
            this.groupBox5.Controls.Add(this.Terms_CBox);
            this.groupBox5.Controls.Add(this.panel1);
            this.groupBox5.Controls.Add(this.Van_Bill_RBtn);
            this.groupBox5.Controls.Add(this.Hostel_Bill_RBtn);
            this.groupBox5.Controls.Add(this.School_Bill_RBtn);
            this.groupBox5.Controls.Add(this.View_Btn);
            this.groupBox5.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox5.Location = new System.Drawing.Point(37, 30);
            this.groupBox5.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox5.Name = "groupBox5";
            this.groupBox5.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox5.Size = new System.Drawing.Size(1241, 91);
            this.groupBox5.TabIndex = 0;
            this.groupBox5.TabStop = false;
            this.groupBox5.Text = "Operations";
            // 
            // Stationary_RBtn
            // 
            this.Stationary_RBtn.AutoSize = true;
            this.Stationary_RBtn.Location = new System.Drawing.Point(872, 38);
            this.Stationary_RBtn.Name = "Stationary_RBtn";
            this.Stationary_RBtn.Size = new System.Drawing.Size(131, 25);
            this.Stationary_RBtn.TabIndex = 191;
            this.Stationary_RBtn.TabStop = true;
            this.Stationary_RBtn.Text = "Stationary Bill";
            this.Stationary_RBtn.UseVisualStyleBackColor = true;
            this.Stationary_RBtn.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Stationary_RBtn_KeyDown);
            // 
            // HMonth_CBox
            // 
            this.HMonth_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.HMonth_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.HMonth_CBox.FormattingEnabled = true;
            this.HMonth_CBox.Items.AddRange(new object[] {
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY"});
            this.HMonth_CBox.Location = new System.Drawing.Point(553, 35);
            this.HMonth_CBox.Name = "HMonth_CBox";
            this.HMonth_CBox.Size = new System.Drawing.Size(116, 29);
            this.HMonth_CBox.TabIndex = 189;
            this.HMonth_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.HMonth_CBox_KeyDown);
            // 
            // Terms_CBox
            // 
            this.Terms_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Terms_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Terms_CBox.FormattingEnabled = true;
            this.Terms_CBox.Items.AddRange(new object[] {
            "TERM1",
            "TERM2",
            "TERM3"});
            this.Terms_CBox.Location = new System.Drawing.Point(342, 35);
            this.Terms_CBox.Name = "Terms_CBox";
            this.Terms_CBox.Size = new System.Drawing.Size(102, 29);
            this.Terms_CBox.TabIndex = 188;
            this.Terms_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Terms_CBox_KeyDown);
            // 
            // panel1
            // 
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.panel1.Controls.Add(this.Print_Btn);
            this.panel1.Location = new System.Drawing.Point(1113, 21);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(114, 58);
            this.panel1.TabIndex = 36;
            // 
            // Print_Btn
            // 
            this.Print_Btn.Location = new System.Drawing.Point(6, 6);
            this.Print_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.Print_Btn.Name = "Print_Btn";
            this.Print_Btn.Size = new System.Drawing.Size(92, 43);
            this.Print_Btn.TabIndex = 36;
            this.Print_Btn.Text = "Print";
            this.Print_Btn.UseVisualStyleBackColor = true;
            this.Print_Btn.Click += new System.EventHandler(this.Print_Btn_Click);
            // 
            // Van_Bill_RBtn
            // 
            this.Van_Bill_RBtn.AutoSize = true;
            this.Van_Bill_RBtn.Location = new System.Drawing.Point(676, 37);
            this.Van_Bill_RBtn.Name = "Van_Bill_RBtn";
            this.Van_Bill_RBtn.Size = new System.Drawing.Size(82, 25);
            this.Van_Bill_RBtn.TabIndex = 38;
            this.Van_Bill_RBtn.TabStop = true;
            this.Van_Bill_RBtn.Text = "Van Bill";
            this.Van_Bill_RBtn.UseVisualStyleBackColor = true;
            this.Van_Bill_RBtn.CheckedChanged += new System.EventHandler(this.Van_Bill_RBtn_CheckedChanged);
            // 
            // Hostel_Bill_RBtn
            // 
            this.Hostel_Bill_RBtn.AutoSize = true;
            this.Hostel_Bill_RBtn.Location = new System.Drawing.Point(448, 37);
            this.Hostel_Bill_RBtn.Name = "Hostel_Bill_RBtn";
            this.Hostel_Bill_RBtn.Size = new System.Drawing.Size(102, 25);
            this.Hostel_Bill_RBtn.TabIndex = 37;
            this.Hostel_Bill_RBtn.TabStop = true;
            this.Hostel_Bill_RBtn.Text = "Hostel Bill";
            this.Hostel_Bill_RBtn.UseVisualStyleBackColor = true;
            this.Hostel_Bill_RBtn.CheckedChanged += new System.EventHandler(this.Hostel_Bill_RBtn_CheckedChanged);
            // 
            // School_Bill_RBtn
            // 
            this.School_Bill_RBtn.AutoSize = true;
            this.School_Bill_RBtn.Location = new System.Drawing.Point(237, 37);
            this.School_Bill_RBtn.Name = "School_Bill_RBtn";
            this.School_Bill_RBtn.Size = new System.Drawing.Size(103, 25);
            this.School_Bill_RBtn.TabIndex = 36;
            this.School_Bill_RBtn.TabStop = true;
            this.School_Bill_RBtn.Text = "School Bill";
            this.School_Bill_RBtn.UseVisualStyleBackColor = true;
            this.School_Bill_RBtn.CheckedChanged += new System.EventHandler(this.School_Bill_RBtn_CheckedChanged);
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1008, 27);
            this.View_Btn.Margin = new System.Windows.Forms.Padding(4);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(96, 46);
            this.View_Btn.TabIndex = 15;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Fees_Pending_Student_Details_dataGridView1);
            this.groupBox4.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox4.Location = new System.Drawing.Point(29, 129);
            this.groupBox4.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox4.Size = new System.Drawing.Size(1251, 457);
            this.groupBox4.TabIndex = 15;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "View";
            // 
            // Fees_Pending_Student_Details_dataGridView1
            // 
            this.Fees_Pending_Student_Details_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Fees_Pending_Student_Details_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Fees_Pending_Student_Details_dataGridView1.Location = new System.Drawing.Point(211, 38);
            this.Fees_Pending_Student_Details_dataGridView1.Margin = new System.Windows.Forms.Padding(4);
            this.Fees_Pending_Student_Details_dataGridView1.Name = "Fees_Pending_Student_Details_dataGridView1";
            this.Fees_Pending_Student_Details_dataGridView1.Size = new System.Drawing.Size(838, 375);
            this.Fees_Pending_Student_Details_dataGridView1.TabIndex = 0;
            this.Fees_Pending_Student_Details_dataGridView1.VirtualMode = true;
            this.Fees_Pending_Student_Details_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Fees_Pending_Student_Details_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(157, 37);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(73, 28);
            this.EYear_Txt.TabIndex = 245;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(73, 35);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(77, 29);
            this.SYear_CBox.TabIndex = 246;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 39);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(54, 21);
            this.label2.TabIndex = 247;
            this.label2.Text = "AYear";
            // 
            // Promotion_With_Held_Student_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.groupBox1);
            this.Name = "Promotion_With_Held_Student_Details_Frm";
            this.Text = "Promotion With Held Student Details";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Promotion_With_Held_Student_Details_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox5.ResumeLayout(false);
            this.groupBox5.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.groupBox4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Fees_Pending_Student_Details_dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox VMonth_CBox;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox5;
        private System.Windows.Forms.ComboBox HMonth_CBox;
        private System.Windows.Forms.ComboBox Terms_CBox;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button Print_Btn;
        private System.Windows.Forms.RadioButton Van_Bill_RBtn;
        private System.Windows.Forms.RadioButton Hostel_Bill_RBtn;
        private System.Windows.Forms.RadioButton School_Bill_RBtn;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.DataGridView Fees_Pending_Student_Details_dataGridView1;
        private System.Windows.Forms.RadioButton Stationary_RBtn;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Label label2;

    }
}